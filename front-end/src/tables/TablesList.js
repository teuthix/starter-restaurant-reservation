import React from "react";

function TableList({ tables, handleFinish }) {
  // formats each table for the Dashboard
  const eachTable = tables.map((table, index) => {
    return (
      <div key={index} className="mb-4">
        <hr />
        <h5 className="red-text">{table.table_name}</h5>
        <div className="px-4">
          <p>Capacity: {table.capacity}</p>
          {table && table.reservation_id ? (
            <p data-table-id-status={table.table_id}>Occupied</p>
          ) : (
            <p data-table-id-status={table.table_id}>Free</p>
          )}
          {table && table.reservation_id ? (
            <button
              data-table-id-finish={table.table_id}
              className="btn btn-secondary"
              value={table.table_id}
              onClick={handleFinish}
            >
              Finish
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  });

  return eachTable;
}

export default TableList;
