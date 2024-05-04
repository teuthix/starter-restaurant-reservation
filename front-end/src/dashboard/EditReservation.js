import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getSingleReservation, editReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const param = useParams();
  const history = useHistory();
  const [showError, setShowError] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  useEffect(() => {
    async function fetchReservations() {
      try {
        const reservation = await getSingleReservation(param.reservation_id);
        setFormData({
          first_name: reservation.first_name,
          last_name: reservation.last_name,
          mobile_number: reservation.mobile_number,
          reservation_date: reservation.reservation_date.slice(0, 10),
          reservation_time: reservation.reservation_time,
          people: reservation.people,
        });
      } catch (error) {
        setShowError(error);
      }
    }
    fetchReservations();
  }, [param, param.reservation_id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await editReservation(formData, param.reservation_id);
      // console.log("in update");
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setShowError(error);
    }
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleNumberChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: Number(target.value) });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="mt-5">
        <h2 className="text-center my-3 platypi-subtitle">Edit Reservation</h2>
        <div className="mx-5 mb-5">
          <ReservationForm
            formData={formData}
            submitHandler={submitHandler}
            handleChange={handleChange}
            handleNumberChange={handleNumberChange}
            showError={showError}
            history={history}
          />
        </div>
      </div>
    </div>
  );
}

export default EditReservation;
