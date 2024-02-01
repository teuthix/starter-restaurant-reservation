import React from "react";
import { Link } from "react-router-dom";

function DashList({ reservations }) {
  const eachReservation = reservations.map((reservation) => {
    const { reservation_id } = reservation;
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

    return (
      <div key={reservation_id}>
        <h5>
          {reservation.first_name} {reservation.last_name}
        </h5>
        <div>
          <p>
            Reservation {reservation.reservation_date}{" "}
            {reservation.reservation_time}
          </p>
          <p>Contact: {reservation.mobile_number}</p>
          <p>Guests: {reservation.people}</p>
          <p data-reservation-id-status={reservation.reservation_id}>
            Status: {reservation.status}
          </p>
        </div>
        {reservation.status === "booked" ? seatButton : ""}
      </div>
    );
  });
  return eachReservation;
}

export default DashList;
