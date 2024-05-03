import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

function NewTable({ tables, setTables, date }) {
  const initialForm = {
    table_name: "",
    capacity: "",
  };

  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialForm });
  const [showError, setShowError] = useState("");

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleNumberChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: Number(target.value) });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newTable = await createTable(formData);
      console.log("new table is", newTable);
      setTables([...tables, newTable]);
      history.push(`/dashboard`);
    } catch (error) {
      setShowError(error);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h2 className="text-center mx-5 my-3">Create New Table</h2>
        <div className="mx-5" style={{ minWidth: "500px" }}>
          <form onSubmit={submitHandler} className="d-flex flex-column">
            <>
              <label htmlFor="table_name">Table Name:</label>
              <input
                name="table_name"
                type="text"
                minLength="2"
                className="mb-4"
                onChange={handleChange}
                required
              />
            </>

            <>
              <label htmlFor="capacity">Capacity:</label>
              <input
                name="capacity"
                type="number"
                min="1"
                className="mb-4"
                onChange={handleNumberChange}
                required
              />
            </>

            {showError ? (
              <div className="alert alert-danger">
                <p>{showError.message}</p>
              </div>
            ) : (
              ""
            )}

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
        </div>
      </div>
    </div>
  );
}

export default NewTable;
