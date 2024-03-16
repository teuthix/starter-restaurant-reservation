function ReservationForm({
  formData,
  submitHandler,
  handleChange,
  handleNumberChange,
  showError,
  history,
}) {
  return (
    <div className="mx-5">
      <h2 className="my-3">New Reservation</h2>
      <form onSubmit={submitHandler} className="d-flex flex-column">
        <>
          <label htmlFor="first_name">first name:</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            className="mb-4 col-4"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="last_name">last name:</label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            className="mb-4 col-4"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="mobile_number">mobile number:</label>
          <input
            name="mobile_number"
            type="text"
            id="mobile_number"
            className="mb-4 col-4"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="reservation_date">reservation date:</label>
          <input
            name="reservation_date"
            id="reservation_date"
            type="date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            className="mb-4 col-4"
            value={formData.reservation_date}
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="reservation_time">reservation time:</label>
          <input
            name="reservation_time"
            type="time"
            id="reservation_time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            className="mb-4 col-4"
            value={formData.reservation_time}
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="people">number of people:</label>
          <input
            name="people"
            type="number"
            min="1"
            id="people"
            className="mb-4 col-4"
            value={formData.people}
            onChange={handleNumberChange}
            required
          />
        </>
        {showError ? (
          <div className="alert alert-danger">
            <p>{showError.message}</p>
          </div>
        ) : (
          ""
        )}
        <div className="d-flex">
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
