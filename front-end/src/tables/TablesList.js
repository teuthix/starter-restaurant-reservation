import React from "react";
import { useHistory } from "react-router-dom";
import { finishTable } from "../utils/api";

function TableList({ tables, setTables }) {
  const history = useHistory();

  const handleFinish = async (e) => {
    const deleteId = e.target.value;
    const text =
      "Is this table ready to seat new guests? This cannot be undone.";

    if (window.confirm(text)) {
      await finishTable(deleteId);
      setTables((currentTables) =>
        currentTables.filter((table) => table.table_id !== deleteId)
      );
      history.go(0);
    }
  };

  const eachTable = tables.map((table, index) => {
    return (
      <div key={index} className="mb-4">
        <hr />
        <h5>{table.table_name}</h5>
        <p>Capacity: {table.capacity}</p>
        {table && table.reservation_id ? (
          <p data-table-id-status={table.table_id}>Occupied</p>
        ) : (
          <p data-table-id-status={table.table_id}>Free</p>
        )}
        {table && table.reservation_id ? (
          <button
            data-table-id-finish={table.table_id}
            className="btn btn-primary"
            value={table.table_id}
            onClick={handleFinish}
          >
            Finish
          </button>
        ) : (
          ""
        )}
      </div>
    );
  });

  return eachTable;
}

export default TableList;
