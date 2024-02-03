import React from "react";
import { Link, useHistory } from "react-router-dom";
import { cancelReservation } from "../utils/api";

function DashList({ reservations, setReservations }) {
  const history = useHistory();

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

    const handleCancel = async (e) => {
      const cancelId = e.target.value;
      const text =
        "Do you want to cancel this reservation? This cannot be undone.";

      if (window.confirm(text)) {
        console.log(cancelId, "from DashList");
        await cancelReservation(reservation_id);
        setReservations((currentReservations) =>
          currentReservations.filter(
            (reservation) => reservation.reservation_id !== cancelId
          )
        );
        history.go(0);
      }
    };

    const formattedReservation = (
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
        <Link to={`/reservations/${reservation.reservation_id}/edit`}>
          <button
            href={`/reservations/${reservation.reservation_id}/seat`}
            className="btn btn-secondary"
          >
            Edit
          </button>
        </Link>
        <button
          data-reservation-id-cancel={reservation.reservation_id}
          className="btn btn-danger"
          value={reservation_id}
          onClick={handleCancel}
        >
          Cancel
        </button>
        {reservation.status === "booked" ? seatButton : ""}
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
