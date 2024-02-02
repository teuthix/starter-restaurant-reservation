import React, { useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservations from "../dashboard/NewReservations";
import NewTable from "../tables/NewTable";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import SeatReservation from "../dashboard/SeatReservations";
import Search from "../search/Search";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/new">
        <NewReservations
          setDate={setDate}
          reservations={reservations}
          setReservations={setReservations}
        />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation tables={tables} setTables={setTables} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          date={date}
          setDate={setDate}
          reservations={reservations}
          setReservations={setReservations}
          tables={tables}
          setTables={setTables}
        />
      </Route>
      <Route path="/tables/new">
        <NewTable tables={tables} setTables={setTables} date={date} />
      </Route>
      <Route exact={true} path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
