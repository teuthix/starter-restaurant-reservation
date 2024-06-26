import React from "react";
import { useHistory } from "react-router-dom";
import DashList from "./DashList";
import { previous, next, today } from "../utils/date-time";
import { cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ListReservations({
  reservations,
  setReservations,
  date,
  setDate,
  reservationsError,
  handleDateChange,
}) {
  const history = useHistory();

  const handlePrevious = () => {
    setDate(previous(date));
    handleDateChange(previous(date));
  };

  const handleNext = () => {
    setDate(next(date));
    handleDateChange(next(date));
  };

  const handleToday = () => {
    setDate(today());
    handleDateChange(today(date));
  };

  const handleCancel = async (e) => {
    const cancelId = e.target.value;
    const text =
      "Do you want to cancel this reservation? This cannot be undone.";

    if (window.confirm(text)) {
      await cancelReservation(cancelId);
      setReservations((currentReservations) =>
        currentReservations.filter(
          (reservation) => reservation.reservation_id !== cancelId
        )
      );
      history.push("/");
    }
  };

  return (
    <main>
      <ErrorAlert error={reservationsError} />
      <DashList
        reservations={reservations}
        setReservations={setReservations}
        handleCancel={handleCancel}
      />
      <div className="mx-5 d-flex justify-content-center">
        <button className="btn btn-secondary" onClick={handlePrevious}>
          previous
        </button>
        <button className="btn btn-secondary" onClick={handleNext}>
          next
        </button>
        <button className="btn btn-primary" onClick={handleToday}>
          today
        </button>
      </div>
    </main>
  );
}

export default ListReservations;
