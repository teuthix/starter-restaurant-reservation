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
      <div className="d-flex row">
        <div className="col-2">
          <div className="top-bar">
            <h1 className="platypi-title rotate">Reservations</h1>
          </div>
        </div>
        <div className="col">
          <div className="side-bar side-border">
            <Menu />
          </div>
          <div className="col">
            <Routes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
