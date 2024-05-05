import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, updateTable, getSingleReservation } from "../utils/api";

function SeatReservation({ tables, setTables }) {
  const param = useParams();
  const history = useHistory();
  const [selectedTable, setSelectedTable] = useState("");
  const [seating, setSeating] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  useEffect(() => {
    async function loadTables() {
      try {
        const response = await listTables();
        setTables(response);
      } catch (error) {
        console.error(error);
      }
    }
    loadTables();
  }, [setTables]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const reservation = await getSingleReservation(param.reservation_id);
        setSeating({
          first_name: reservation.first_name,
          last_name: reservation.last_name,
          mobile_number: reservation.mobile_number,
          reservation_date: reservation.reservation_date.slice(0, 10),
          reservation_time: reservation.reservation_time,
          people: reservation.people,
        });
      } catch (error) {
        // setShowError(error);
      }
    }
    fetchReservations();
  }, [param, param.reservation_id]);

  const tableOptions = tables.map((table, index) => {
    return (
      <option key={index} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { reservation_id } = param;
      await updateTable(Number(reservation_id), selectedTable);
      history.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h2 className="platypi-subtitle">Seat reservation</h2>
      <h4 className="mt-3">Reservation Info</h4>
      <div className="mb-4" style={{ minWidth: "20%" }}>
        <div className="d-flex justify-content-between">
          <p>Name</p>
          <hr className="flex-grow-1 mx-2" />
          <p>
            {seating.first_name} {seating.last_name}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Date/Time</p>
          <hr className="flex-grow-1 mx-2" />
          <p>
            {seating.reservation_date} at {seating.reservation_time}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Contact:</p>
          <hr className="flex-grow-1 mx-2" />
          <p>{seating.mobile_number}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Guests:</p>
          <hr className="flex-grow-1 mx-2" />
          <p>{seating.people}</p>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <select
          name="table_id"
          onChange={(e) => setSelectedTable(e.target.value)}
          className="p-1"
        >
          <option value="">--- Please Select Option ---</option>
          {tableOptions}
        </select>
        <button type="submit" className="btn btn-primary mx-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SeatReservation;
