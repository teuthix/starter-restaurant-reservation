import React from "react";
import { Link } from "react-router-dom";
import { cancelReservation } from "../utils/api";

function FoundMatches({ foundMatches, setFoundMatches }) {
  // const history = useHistory();

  const formatMatches = foundMatches.map((reservation) => {
    const handleCancel = async (e) => {
      const cancelId = e.target.value;
      const text =
        "Do you want to cancel this reservation? This cannot be undone.";

      if (window.confirm(text)) {
        console.log(cancelId, "from DashList");
        await cancelReservation(reservation.reservation_id);
        setFoundMatches((currentMatches) =>
          currentMatches.filter(
            (reservation) => reservation.reservation_id !== cancelId
          )
        );
        setFoundMatches();
        // history.go(0);
      }
    };

    return (
      <div key={reservation.reservation_id}>
        <h4>
          {reservation.first_name} {reservation.last_name}
        </h4>
        <p>Mobile Number: {reservation.mobile_number}</p>
        <p>
          Date: {reservation.reservation_date.slice(0, 9)}
          {" at "}
          {reservation.reservation_time.slice(0, 5)}
        </p>
        <p>Guests: {reservation.people}</p>
        <p>Status: {reservation.status}</p>
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
          value={reservation.reservation_id}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    );
  });
  return formatMatches;
}

export default FoundMatches;
