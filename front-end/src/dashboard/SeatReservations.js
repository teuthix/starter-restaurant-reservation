import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { listTables } from "../utils/api";

function SeatReservation({ tables, setTables }) {
  const param = useParams();
  //   console.log(param);
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
      <option key={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <>
      <h4>Seat reservation</h4>
      <form>
        <select name="table_id">{tableOptions}</select>
        <button type="submit" className="btn btn-primary mx-4">
          Submit
        </button>
      </form>
    </>
  );
}

export default SeatReservation;
