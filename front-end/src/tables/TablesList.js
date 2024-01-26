function TableList({ tables }) {
  //   console.log(tables);
  const eachTable = tables.map((eaTable, index) => {
    return (
      <div key={index}>
        <h5>{eaTable.table_name}</h5>
        <p>Capacity: {eaTable.capacity}</p>
        {eaTable && eaTable.isOccupied ? (
          <p data-table-id-status={eaTable.table_id}>Occuppied</p>
        ) : (
          <p data-table-id-status={eaTable.table_id}>Free</p>
        )}
      </div>
    );
  });
  return eachTable;
}

export default TableList;
