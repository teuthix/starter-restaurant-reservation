import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex">
        <Link className="navbar-brand d-flex sidebar-brand" to="/">
          <div className="sidebar-brand-text mx-5 my-2">
            <span>Periodic Tables</span>
          </div>
        </Link>
        <ul
          className="nav navbar-nav flex-row text-light"
          id="accordionSidebar"
        >
          <li className="nav-item mx-5">
            <Link className="nav-link" to="/dashboard">
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item mx-5">
            <Link className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item  mx-5">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item  mx-5">
            <Link className="nav-link" to="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
