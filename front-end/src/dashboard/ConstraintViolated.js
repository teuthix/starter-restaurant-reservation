function ConstraintViolated({ showError }) {
  return (
    <div className="alert alert-danger">
      <p>{showError}</p>
    </div>
  );
}

export default ConstraintViolated;
