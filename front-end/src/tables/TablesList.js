function TableList({ tables }) {
  const eachTable = tables.map((table, index) => {
    return (
      <div key={index}>
        <h5>{table.table_name}</h5>
        <p>Capacity: {table.capacity}</p>
        {table && table.isOccupied ? (
          <p data-table-id-status={table.table_id}>Occupied</p>
        ) : (
          <p data-table-id-status={table.table_id}>Free</p>
        )}
      </div>
    );
  });
  return eachTable;
}

export default TableList;
