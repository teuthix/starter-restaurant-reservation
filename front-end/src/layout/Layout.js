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
        <div className="">
          <div className="title-bar">
            <h1 className="platypi-title rotate">Reservations</h1>
          </div>
        </div>
        <div className="col p-0" style={{ marginLeft: "18.5%" }}>
          <div className="menu-bar menu-border">
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
