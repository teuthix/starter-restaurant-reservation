import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";

function SeatReservation({ tables, setTables }) {
  const param = useParams();
  const [selectedTable, setSelectedTable] = useState("");
  useEffect(loadTables, [setTables]);

  async function loadTables() {
    const abortController = new AbortController();
    try {
      const response = await listTables();
      setTables(response);
    } catch (error) {
      console.error(error);
    } finally {
      abortController.abort();
    }
  }

  const tableOptions = tables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("selected", selectedTable);
    try {
      const update = { reservation_id: param, table_id: selectedTable };
      const updatedTable = await updateTable(update);
      setTables(...tables, updatedTable);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h4>Seat reservation</h4>
      <form onSubmit={submitHandler}>
        <select
          name="table_id"
          onChange={(e) => setSelectedTable(e.target.value)}
        >
          <option value="">--- Please Select Option ---</option>
          {tableOptions}
        </select>
        <button type="submit" className="btn btn-primary mx-4">
          Submit
        </button>
      </form>
    </>
  );
}

export default SeatReservation;
