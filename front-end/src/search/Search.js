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
    <>
      <div className="d-flex justify-content-center my-5">
        <h2 className="platypi-subtitle">Search by Mobile Number</h2>
        <div className="mx-5">
          <form onSubmit={submitHandler} className="d-flex flex-row">
            <input
              name="mobile_number"
              type="text"
              id="mobile_number"
              placeholder="Enter a customer's phone number"
              onChange={changeHandler}
              className="my-2"
              style={{ minWidth: "500px" }}
            />
            <button type="submit" className="btn btn-primary mx-3 my-1">
              Find
            </button>
          </form>
        </div>
      </div>

      {showResults ? (
        <FoundMatches
          foundMatches={foundMatches}
          setFoundMatches={setFoundMatches}
        />
      ) : (
        ""
      )}
      {noResultsToggle ? <p>No reservations found</p> : ""}
    </>
  );
}

export default Search;
