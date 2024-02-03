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
    <div>
      <h3>Search by Mobile Number</h3>
      <form onSubmit={submitHandler}>
        <input
          name="mobile_number"
          type="text"
          id="mobile_number"
          placeholder="Enter a customer's phone number"
          onChange={changeHandler}
        />
        <button type="submit" className="btn btn-primary">
          Find
        </button>
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
