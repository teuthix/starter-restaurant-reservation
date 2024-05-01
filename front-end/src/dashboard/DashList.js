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
      <div key={index} className="card mb-4">
        <h5 className="card-header">
          {reservation.first_name} {reservation.last_name}
        </h5>

        <ul className="list-group list-group-flush">
          <li className="list-group-item border-0 d-flex justify-content-between">
            <p>Reservation</p>
            <p>...........................</p>
            <p>
              {reservation.reservation_date} at {reservation.reservation_time}
            </p>
          </li>
          <li className="list-group-item border-0 d-flex justify-content-between">
            <p>Contact:</p>
            <p>.................................................</p>
            <p>{reservation.mobile_number}</p>
          </li>
          <li className="list-group-item border-0 d-flex justify-content-between">
            <p>Guests:</p>
            <p>
              .......................................................................
            </p>
            <p>{reservation.people}</p>
          </li>
          <li
            className="list-group-item border-0  d-flex justify-content-between"
            data-reservation-id-status={reservation.reservation_id}
          >
            <p>Status:</p>
            <p>.............................................................</p>
            <p>{reservation.status}</p>
          </li>
        </ul>
        <li className="list-group-item border-0">
          {reservation.status === "booked" ? seatButton : ""}
          {reservation.status === "booked" ? editButton : ""}
          {cancelButton}
        </li>
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
