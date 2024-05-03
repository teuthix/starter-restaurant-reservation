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
      <div key={index} className="col mb-5">
        <div className="card">
          <h4 className="card-header">
            {reservation.first_name} {reservation.last_name}
          </h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item border-0 d-flex justify-content-between">
              <p>Mobile Number: {reservation.mobile_number}</p>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between">
              <p>
                Date: {reservation.reservation_date.slice(0, 9)}
                {" at "}
                {reservation.reservation_time.slice(0, 5)}
              </p>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between">
              <p>Guests: {reservation.people}</p>
            </li>
            <li className="list-group-item border-0 d-flex justify-content-between">
              <p>Status: {reservation.status}</p>
            </li>
            <li className="list-group-item border-0">
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
            </li>
          </ul>
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
