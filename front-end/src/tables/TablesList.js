function TableList({ tables }) {
  const eachTable = tables.map((table, index) => {
    return (
      <div key={index} className="mb-4">
        <h5>{table.table_name}</h5>
        <p>Capacity: {table.capacity}</p>
        {table && table.isOccupied ? (
          <p data-table-id-status={table.table_id}>Occupied</p>
        ) : (
          <p data-table-id-status={table.table_id}>Free</p>
        )}
        {table && table.isOccupied ? (
          <button
            data-table-id-finish={table.table_id}
            className="btn btn-primary"
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
