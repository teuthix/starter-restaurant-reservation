import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function NewReservations({ setDate, reservations, setReservations }) {
  const initialForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
    status: "booked",
  };

  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialForm });
  const [showError, setShowError] = useState("");

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    // console.log(formData);
  };

  const handleNumberChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: Number(target.value) });
  };

  const submitHandler = async (e) => {
    console.log("in submithandler");
    e.preventDefault();
    try {
      setDate(formData.reservation_date);
      const newReservation = await createReservation(formData);
      console.log("new reservation is", newReservation);
      setReservations([...reservations, newReservation]);
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setShowError(error);
    }
  };

  return (
    <>
      <h2 className="px-4 pt-4">New Reservation</h2>
      {/* <div className="d-flex flex-row justify-content-center"> */}
      {/* <hr className="mx-5" /> */}
      <div className="mx-5 mb-5">
        <ReservationForm
          formData={formData}
          submitHandler={submitHandler}
          handleChange={handleChange}
          handleNumberChange={handleNumberChange}
          showError={showError}
          history={history}
        />
        {/* </div> */}
        {/* <hr className="mx-5" /> */}
      </div>
    </>
  );
}

export default NewReservations;
