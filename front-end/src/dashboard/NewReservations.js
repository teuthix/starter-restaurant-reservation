import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ConstraintViolated from "./ConstraintViolated";
import { today } from "../utils/date-time";

function NewReservations({ setDate, reservations, setReservations }) {
  const initialForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialForm });
  const [constraints, setConstraints] = useState([]);
  // if constraints are violated, push violating constraint into array,
  // if constraints.length, alert renders and submit does not occur

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleNumberChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: Number(target.value) });
  };

  const checkDate = () => {
    let todayString = today();
    let todayYear = Number.parseInt(todayString.slice(0, 4));
    let todayMonth = Number.parseInt(todayString.slice(5, 7));
    let todayDay = Number.parseInt(todayString.slice(8, 10));

    let newResDate = formData.reservation_date;
    let resYear = Number.parseInt(newResDate.slice(0, 4));
    let resMonth = Number.parseInt(newResDate.slice(5, 7));
    let resDay = Number.parseInt(newResDate.slice(8, 10));
    // console.log(resYear, resMonth, resDay);

    // check if year is equal to or greater than today(), if yes,
    // check if month is equal to or greater than today(), if yes,
    // check if day is equal to or greater than today(), if yes, set constraints to false
    if (resYear >= todayYear && resMonth >= todayMonth && resDay >= todayDay) {
      return;
    } else {
      setConstraints([...constraints, "invalidDate"]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("submit pressed", formData);
    checkDate();
    // if (constraints) {
    //   try {
    //     const newReservation = await createReservation(formData);
    //     console.log("new reservation is", newReservation);
    //     setDate(formData.reservation_date);
    //     setReservations([...reservations, newReservation]);
    //     history.push(`/dashboard?date=${formData.reservation_date}`);
    //   } catch (error) {
    //     console.log("error----> ", error);
    //   }
    // }
  };

  return (
    <>
      <h4 className="mt-4">New Reservation</h4>
      <form onSubmit={submitHandler} className="d-flex flex-column mx-4 pt-4">
        <>
          <label htmlFor="first_name">first name:</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            className="mb-4"
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="last_name">last name:</label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            className="mb-4"
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="mobile_number">mobile number:</label>
          <input
            name="mobile_number"
            type="text"
            id="mobile_number"
            className="mb-4"
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="reservation_date">reservation date:</label>
          <input
            name="reservation_date"
            id="reservation_date"
            type="date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            className="mb-4"
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="reservation_time">reservation time:</label>
          <input
            name="reservation_time"
            type="time"
            id="reservation_time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            className="mb-4"
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="people">number of people:</label>
          <input
            name="people"
            type="number"
            min="1"
            id="people"
            className="mb-4"
            onChange={handleNumberChange}
            required
          />
        </>
        <ConstraintViolated
          constraints={constraints}
          // setConstraints={setConstraints}
        />
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

export default NewReservations;
