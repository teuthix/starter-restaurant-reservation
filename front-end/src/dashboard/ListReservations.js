import React from "react";
import DashList from "./DashList";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

function ListReservations({
  reservations,
  date,
  setDate,
  reservationsError,
  handleDateChange,
}) {
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

  return (
    <main>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <DashList date={date} reservations={reservations} />
      {/* {JSON.stringify(reservations)} */}
      <div>
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
