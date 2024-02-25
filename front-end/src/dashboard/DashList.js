import React from "react";
import { Link } from "react-router-dom";

function DashList({ reservations, setReservations, handleCancel }) {
  const eachReservation = reservations.map((reservation) => {
    const { reservation_id } = reservation;
    // console.log(
    //   `/reservations/${reservation_id}/seat`,
    //   "-------------------------"
    // );
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
      <Link to={`/reservations/${reservation_id}/seat`}>
        <button
          href={`/reservations/${reservation_id}/seat`}
          type="button"
          className="btn btn-primary"
        >
          Seat
        </button>
      </Link>
    );

    // const handleCancel = async (e) => {
    //   const cancelId = e.target.value;
    //   const text =
    //     "Do you want to cancel this reservation? This cannot be undone.";

    //   if (window.confirm(text)) {
    //     console.log(cancelId, "from DashList");
    //     await cancelReservation(reservation_id);
    //     setReservations((currentReservations) =>
    //       currentReservations.filter(
    //         (reservation) => reservation.reservation_id !== cancelId
    //       )
    //     );
    //     history.go(0);
    //   }
    // };

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
        {reservation.status === "booked" ? editButton : ""}
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
