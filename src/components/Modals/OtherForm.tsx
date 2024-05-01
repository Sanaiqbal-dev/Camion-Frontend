import { Form } from "react-bootstrap";

const OtherForm = () => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Other Type</Form.Label>
        <Form.Select
          aria-label="Select truck type"
          style={{
            width: "560px",
            height: "59px",
          }}
        >
          <option>Select Type</option>
          <option>Type1</option>
          <option>Type 2</option>
          <option>Type 3</option>
          <option>Type 4</option>
          <option>Type 5</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3 d-flex">
        <Form.Control
          type="text"
          placeholder="Length"
          style={{
            width: "164px",
            height: "59px",
          }}
        />
        <Form.Control
          type="text"
          placeholder="Width"
          style={{
            width: "164px",
            height: "59px",
            margin: "0 -2px 0 -2px",
          }}
        />
        <Form.Control
          type="text"
          placeholder="Height"
          style={{
            width: "164px",
            height: "59px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "59px",
            width: "68px",
            backgroundColor: "#E0E0E0",
            color: "#7A7A7A",
          }}
        >
          Cm
        </div>
      </Form.Group>
      <Form.Group className="mb-3 d-flex">
        <Form.Control
          type="text"
          placeholder="Weight per Item"
          style={{
            width: "498px",
            height: "59px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "59px",
            width: "68px",
            backgroundColor: "#E0E0E0",
            color: "#7A7A7A",
          }}
        >
          Kg
        </div>
      </Form.Group>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "10px",
          marginLeft: "-60%",
        }}
      >
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
          <label className="form-check-label">Cargo item are stackable</label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
          />
          <label>Including ADR goods</label>
        </div>
      </div>
    </>
  );
};

export default OtherForm;
