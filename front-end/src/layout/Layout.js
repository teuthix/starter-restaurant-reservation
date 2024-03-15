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
      <div className="column">
        <div className="p-4 top-bar">
          <div className="big-border">
            <h1 className="px-4 pt-4 text-white oleo-script-bold">
              Reservations
            </h1>
          </div>
        </div>
        <div className="row h-100">
          <div className="col-md-2 side-bar">
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
