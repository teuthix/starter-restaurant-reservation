import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

function NewTable({ tables, setTables }) {
  const initialForm = {
    table_name: "",
    capacity: "",
  };

  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialForm });
  console.log(formData);

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
      console.log("new reservation is", newTable);
      setTables([...tables, newTable]);
      history.push(`/dashboard`);
    } catch (error) {
      // setShowError(error);
      console.log("error----> ", error);
    }
  };

  return (
    <>
      <h4>Create New Table</h4>
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
