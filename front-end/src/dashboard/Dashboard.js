import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { listReservations } from "../utils/api";
import ListReservations from "./ListReservations";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  const location = useLocation();

  // if no search in url, make it today's date
  useEffect(() => {
    if (!location.search) {
      history.push({
        pathname: location.pathname,
        search: `?date=${date}`,
      });
    }
  }, [date, history, location.pathname, location.search]);

  // handleDateChange changes date in the url, passed into ListReservations
  const handleDateChange = (newDate) => {
    setDate(newDate);

    history.push({
      pathname: location.pathname,
      search: `?date=${newDate}`,
    });
  };

  //added reservations to useEffect due to error
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    // console.log("inside loadDashboard", reservations);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  console.log(reservations);

  return (
    <>
      <ListReservations
        reservations={reservations}
        date={date}
        setDate={setDate}
        reservationsError={reservationsError}
        handleDateChange={handleDateChange}
      />
    </>
  );
}

export default Dashboard;
