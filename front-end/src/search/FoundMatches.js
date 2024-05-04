import React from "react";
import { Link } from "react-router-dom";
import { cancelReservation } from "../utils/api";

function FoundMatches({ foundMatches, setFoundMatches }) {
  // const history = useHistory();

  const formatMatches = foundMatches.map((reservation, index) => {
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
      }
    };

    return (
      <div key={index} className="col mb-5 px-4">
        <h4>
          {reservation.first_name} {reservation.last_name}
        </h4>
        <div className="px-3">
          <div className="d-flex justify-content-between">
            <p>Mobile Number</p>
            <p>.....................</p>
            <p> {reservation.mobile_number}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Date</p>
            <p>................................</p>
            <p>
              {reservation.reservation_date.slice(0, 9)}
              {" at "}
              {reservation.reservation_time.slice(0, 5)}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Guests</p>
            <p>............................................................</p>
            <p>{reservation.people}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Status</p>
            <p>...................................................</p>
            <p> {reservation.status}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-4">
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
      </div>
    );
  });
  return (
    <div className="container">
      <div className="m-3 row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {formatMatches}
      </div>
    </div>
  );
}

export default FoundMatches;
