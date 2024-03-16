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
      console.log("error----> ", error);
    }
  };

  return (
    <>
      <h3>Create New Table</h3>
      <form onSubmit={submitHandler} className="d-flex flex-column mx-4 pt-4">
        <>
          <label htmlFor="table_name">Table Name:</label>
          <input
            name="table_name"
            type="text"
            minLength="2"
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
            onChange={handleNumberChange}
            required
          />
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
