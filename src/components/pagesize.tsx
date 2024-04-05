const pagesize = () => {
  const values = [10, 20, 30, 40, 50];
  let currentIndex = 0;

  const changeValue = (direction: number) => {
    currentIndex += direction;

    if (currentIndex >= values.length) {
      currentIndex = values.length - 1;
    } else if (currentIndex < 0) {
      currentIndex = 0;
    }
  };
  return (
    <div className="spinner-container">
      <span style={{ color: "#535353" }}>Show</span>
      <div className="value-spinner">
        <input
          type="text"
          id="spinnerValue"
          readOnly
          value={values[currentIndex]}
        />

        <div className="spinner-icons">
          <img src="/assets/ic-previous.svg" onClick={() => changeValue(-1)} />
          <img src="/assets/ic-next.svg" onClick={() => changeValue(1)} />
        </div>
      </div>
      <span style={{ color: "#535353" }}>entries</span>
    </div>
  );
};

export default pagesize;
