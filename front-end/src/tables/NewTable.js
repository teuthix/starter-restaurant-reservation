import React from "react";
import { useHistory } from "react-router-dom";

function NewTable() {
  const history = useHistory();
  return (
    <>
      <h4>Create New Table</h4>
      <form className="d-flex flex-column mx-4 pt-4">
        <>
          <label htmlFor="table_name">Table Name:</label>
          <input name="table_name" />
        </>

        <>
          <label htmlFor="capacity">Capacity:</label>
          <input name="capacity" />
        </>

        <div className="d-flex">
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default NewTable;
