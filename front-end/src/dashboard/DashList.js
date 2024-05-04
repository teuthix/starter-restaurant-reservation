import React from "react";
import { Link } from "react-router-dom";

function DashList({ reservations, setReservations, handleCancel }) {
  const eachReservation = reservations.map((reservation, index) => {
    const { reservation_id } = reservation;
    const cancelButton = (
      <button
        data-reservation-id-cancel={reservation.reservation_id}
        className="btn btn-danger"
        value={reservation_id}
        onClick={handleCancel}
      >
        Cancel
      </button>
    );
    const editButton = (
      <Link to={`/reservations/${reservation_id}/edit`}>
        <button
          href={`/reservations/${reservation_id}/seat`}
          className="btn btn-secondary"
        >
          Edit
        </button>
      </Link>
    );

    const seatButton = (
      <Link to={`/reservations/${reservation.reservation_id}/seat`}>
        <button
          href={`/reservations/${reservation.reservation_id}/seat`}
          type="button"
          className="btn btn-primary"
        >
          Seat
        </button>
      </Link>
    );

    const formattedReservation = (
      <div key={index} className="my-4 mx-3 px-5">
        <h4 className="mb-4">
          {reservation.first_name} {reservation.last_name}
        </h4>
        <div className="px-4">
          <div className="d-flex justify-content-between">
            <p>Reservation</p>
            <hr className="flex-grow-1 mx-2" />
            <p>
              {reservation.reservation_date} at {reservation.reservation_time}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Contact:</p>
            <hr className="flex-grow-1 mx-2" />
            <p>{reservation.mobile_number}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Guests:</p>
            <hr className="flex-grow-1 mx-2" />
            <p>{reservation.people}</p>
          </div>
          <div
            className="d-flex justify-content-between"
            data-reservation-id-status={reservation.reservation_id}
          >
            <p>Status:</p>
            <hr className="flex-grow-1 mx-2" />
            <p>{reservation.status}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-4">
          {reservation.status === "booked" ? seatButton : ""}
          {reservation.status === "booked" ? editButton : ""}
          {cancelButton}
        </div>
        <hr />
      </div>
    );

    if (reservation.status !== "cancelled") {
      return formattedReservation;
    } else {
      return null;
    }
  });

  return eachReservation;
}

export default DashList;
