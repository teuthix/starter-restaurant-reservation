function ReservationForm({
  formData,
  submitHandler,
  handleChange,
  handleNumberChange,
  showError,
  history,
}) {
  return (
    <div>
      <div className="mx-5" style={{ minWidth: "500px" }}>
        <form onSubmit={submitHandler} className="d-flex flex-column">
          <>
            <label htmlFor="first_name">First name:</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              className="mb-4 col"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </>
          <>
            <label htmlFor="last_name">Last name:</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              className="mb-4 col"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </>
          <>
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              name="mobile_number"
              type="tel"
              id="mobile_number"
              pattern="([0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{10})"
              placeholder="format 123-456-7890"
              className="mb-4 col"
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />
          </>
          <>
            <label htmlFor="reservation_date">Reservation Date:</label>
            <input
              name="reservation_date"
              id="reservation_date"
              type="date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              className="mb-4 col"
              value={formData.reservation_date}
              onChange={handleChange}
              required
            />
          </>
          <>
            <label htmlFor="reservation_time">Reservation Time:</label>
            <input
              name="reservation_time"
              type="time"
              id="reservation_time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              className="mb-4 col"
              value={formData.reservation_time}
              onChange={handleChange}
              required
            />
          </>
          <>
            <label htmlFor="people">Number of People:</label>
            <input
              name="people"
              type="number"
              min="1"
              id="people"
              className="mb-4 col"
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
    </div>
  );
}

export default ReservationForm;
