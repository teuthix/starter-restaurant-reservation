import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";

function SeatReservation({ tables, setTables }) {
  const param = useParams();
  const history = useHistory();
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    async function loadTables() {
      try {
        const response = await listTables();
        setTables(response);
      } catch (error) {
        console.error(error);
      }
    }
    loadTables();
  }, [setTables]);

  const tableOptions = tables.map((table, index) => {
    return (
      <option key={index} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { reservation_id } = param;
      await updateTable(Number(reservation_id), selectedTable);
      history.push("/dashboard");
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
