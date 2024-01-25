import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ListReservations from "./ListReservations";
import TableList from "../tables/TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({
  date,
  setDate,
  reservations,
  setReservations,
  tables,
  setTables,
}) {
  // const [reservations, setReservations] = useState([]);
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
  useEffect(loadDashboard, [date, setReservations]);
  useEffect(loadTables, [date, setTables]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  async function loadTables() {
    const abortController = new AbortController();
    try {
      const response = await listTables();
      setTables(response);
    } catch (error) {
      console.error(error);
    } finally {
      abortController.abort();
    }
  }

  // console.log(reservations);

  return (
    <>
      <h1>Dashboard</h1>

      <div className="d-flex flex-row pt-4">
        <div className="mx-5">
          <ListReservations
            reservations={reservations}
            date={date}
            setDate={setDate}
            reservationsError={reservationsError}
            handleDateChange={handleDateChange}
          />
        </div>
        <div>
          <h4>Tables</h4>
          <TableList tables={tables} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
