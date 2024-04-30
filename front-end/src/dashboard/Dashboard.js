import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ListReservations from "./ListReservations";
import TableList from "../tables/TablesList";
import { finishTable } from "../utils/api";
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
      console.log("no date given");
      history.push({
        pathname: location.pathname,
        search: `?date=${today()}`,
      });
    } else {
      console.log(
        "we made it inside this second if condition of our Dashboard component"
      );
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
    const abortController = new AbortController();

    async function fetchReservations() {
      try {
        const response = await listReservations(
          { date },
          abortController.signal
        );
        setReservations(response);
        setReservationsError(null);
      } catch (error) {
        console.error(error);
      }
    }
    fetchReservations();
    return () => {
      abortController.abort();
    };
  }, [date, setReservations]);

  useEffect(() => {
    async function loadTables() {
      const abortController = new AbortController();
      try {
        const response = await listTables();
        console.log("loadingTables");
        setTables(response);
      } catch (error) {
        console.error(error);
      } finally {
        abortController.abort();
      }
    }
    loadTables();
  }, [date, setTables]);

  const handleFinish = async (e) => {
    const deleteId = e.target.value;
    const text =
      "Is this table ready to seat new guests? This cannot be undone.";

    if (window.confirm(text)) {
      await finishTable(deleteId);
      setTables((currentTables) =>
        currentTables.filter((table) => table.table_id !== deleteId)
      );
      history.push("/");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center pt-4">
        <div className="mx-5">
          <h2 className="mb-0">
            Reservations for <span className="red-text">{date}</span>
          </h2>
          <ListReservations
            reservations={reservations}
            setReservations={setReservations}
            date={date}
            setDate={setDate}
            reservationsError={reservationsError}
            handleDateChange={handleDateChange}
          />
        </div>
        <hr className="mx-5" />
        <div className="mx-5">
          <h4>Tables</h4>
          <TableList tables={tables} handleFinish={handleFinish} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
