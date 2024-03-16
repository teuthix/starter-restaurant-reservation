import React, { useState } from "react";
import { searchByMobile } from "../utils/api";
import FoundMatches from "./FoundMatches";

function Search() {
  const initialForm = {
    mobile_number: "",
  };
  const [formData, setFormData] = useState({ ...initialForm });
  const [noResultsToggle, setNoResultsToggle] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [foundMatches, setFoundMatches] = useState([]);
  let results;

  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    results = await searchByMobile(formData);
    if (results.length === 0) {
      setShowResults(false);

      setNoResultsToggle(true);
    } else {
      setShowResults(true);
      setNoResultsToggle(false);
      setFoundMatches(results);
    }
  };

  return (
    <div className="mx-5">
      <h2 className="my-3">Search by Mobile Number</h2>
      <form onSubmit={submitHandler} className="d-flex flex-column">
        <input
          name="mobile_number"
          type="text"
          id="mobile_number"
          placeholder="Enter a customer's phone number"
          onChange={changeHandler}
          className="mb-3 col-4"
        />
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Find
          </button>
        </div>
      </form>
      {showResults ? (
        <FoundMatches
          foundMatches={foundMatches}
          setFoundMatches={setFoundMatches}
        />
      ) : (
        ""
      )}
      {noResultsToggle ? <p>No reservations found</p> : ""}
    </div>
  );
}

export default Search;
