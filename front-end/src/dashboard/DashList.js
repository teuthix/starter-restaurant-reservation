// import React from "react";

function DashList({ date, reservations }) {
  //   console.log(reservations[0]);
  const eachReservation = reservations.map((eachRes, index) => {
    return (
      <div key={index}>
        <h5>
          {eachRes.first_name} {eachRes.last_name}
        </h5>
        <div>
          <p>reservation date: {eachRes.reservation_date}</p>
          <p>reservation time: {eachRes.reservation_time}</p>
          <p>number of people: {eachRes.people}</p>
        </div>
      </div>
    );
  });
  return eachReservation;
}

export default DashList;
