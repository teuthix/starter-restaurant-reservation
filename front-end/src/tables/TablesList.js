import { deleteTable } from "../utils/api";

function TableList({ tables, setTables }) {
  const handleFinish = async (e) => {
    const text =
      "Is this table ready to seat new guests? This cannot be undone.";
    if (window.confirm(text)) {
      console.log(e.target.value);
      const deleteId = e.target.value;
      await deleteTable(deleteId);
      setTables((currentTables) => {
        currentTables.filter((table) => table.table_id !== deleteId);
      });
    }
  };

  const eachTable = tables.map((table, index) => {
    return (
      <div key={table.table_id} className="mb-4">
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
