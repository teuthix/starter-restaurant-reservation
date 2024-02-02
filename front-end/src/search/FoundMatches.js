function FoundMatches({ foundMatches }) {
  const formatMatches = foundMatches.map((reservation) => {
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
      </div>
    );
  });
  return formatMatches;
}

export default FoundMatches;
