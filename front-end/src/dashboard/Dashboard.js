import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ListReservations from "./ListReservations";
import TableList from "../tables/TablesList";
import { today } from "../utils/date-time";

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
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  const location = useLocation();

  // if no search in url, make it today's date
  useEffect(() => {
    if (!location.search) {
      history.push({
        pathname: location.pathname,
        search: `?date=${today()}`,
      });
      console.log(date, "no search");
    } else if (location.search.includes("?date=")) {
      const queryDate = new URLSearchParams(location.search).get("date");
      setDate(queryDate);
    }
  }, [date, setDate, history, location.pathname, location.search]);

  // handleDateChange changes date in the url, passed into ListReservations
  const handleDateChange = (newDate) => {
    setDate(newDate);

    history.push({
      pathname: location.pathname,
      search: `?date=${newDate}`,
    });
  };

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await listReservations({ date });
        setReservations(response);
        setReservationsError(null);
      } catch (error) {
        console.error(error);
      }
    }
    fetchReservations();
  }, [date, setReservations]);

  useEffect(() => {
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

    loadTables();
  }, [date, setTables]);

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
          <TableList tables={tables} setTables={setTables} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
