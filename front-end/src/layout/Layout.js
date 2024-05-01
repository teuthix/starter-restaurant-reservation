import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div>
      <div className="d-flex row g-0">
        <div className="col-2 p-0">
          <div className="top-bar">
            <h1 className="oleo-script-bold rotate">Reservations</h1>
          </div>
        </div>
        <div className="col" style={{ paddingLeft: 0 }}>
          <div className="side-bar">
            <Menu />
          </div>
          <div className="col mt-5">
            <Routes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
