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
    <div className="container mx-5">
      <div className="">
        <h2 className="text-center my-3 mb-4">Search by Mobile Number</h2>
      </div>
      <div>
        <form
          onSubmit={submitHandler}
          className="d-flex mx-5 text-center align-items-baseline flex-row mb-4"
        >
          <input
            name="mobile_number"
            type="text"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
            onChange={changeHandler}
            className="mb-3 col-11"
          />
          <button type="submit" className="btn btn-primary mx-3">
            Find
          </button>
        </form>
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
    </div>
  );
}

export default Search;
