import React from "react";
import { Link } from "react-router-dom";

function DashList({ date, reservations }) {
  const eachReservation = reservations.map((reservation, index) => {
    const { reservation_id } = reservation;
    return (
      <div key={index}>
        <h5>
          {reservation.first_name} {reservation.last_name}
        </h5>
        <div>
          <p>reservation date: {reservation.reservation_date}</p>
          <p>reservation time: {reservation.reservation_time}</p>
          <p>mobile number: {reservation.mobile_number}</p>
          <p>number of people: {reservation.people}</p>
        </div>
        <Link to={`/reservations/${reservation_id}/seat`}>
          <button
            href={`/reservations/${reservation_id}/seat`}
            type="button"
            className="btn btn-primary"
          >
            Seat
          </button>
        </Link>
      </div>
    );
  });
  return eachReservation;
}

export default DashList;
