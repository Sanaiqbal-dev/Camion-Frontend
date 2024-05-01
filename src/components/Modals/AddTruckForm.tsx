import { useState } from "react";
import { Form } from "react-bootstrap";

const AddTruckForm = () => {
  const [trucks, setTrucks] = useState([{ id: 1 }]);

  const addTruck = () => {
    const newTruckId = trucks.length + 1;
    setTrucks([...trucks, { id: newTruckId }]);
  };

  const removeTruck = (id: number) => {
    setTrucks(trucks.filter((truck) => truck.id !== id));
  };

  return (
    <>
      {trucks.map((truck, index) => (
        <div key={index} style={{ display: "flex", gap: "18px" }}>
          <Form.Group className="mb-3">
            <Form.Label>Number of Trucks</Form.Label>
            <Form.Control
              type="text"
              placeholder="1"
              style={{
                width: "229px",
                height: "59px",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={`formBasicEmail-${truck.id}`}>
            <Form.Label>Type of truck</Form.Label>
            <Form.Select
              aria-label="Select truck type"
              style={{
                width: "229px",
                height: "59px",
              }}
            >
              <option>Select Truck Type</option>
              <option>Truck 1</option>
              <option>Truck 2</option>
              <option>Truck 3</option>
              <option>Truck 4</option>
              <option>Truck 5</option>
            </Form.Select>
          </Form.Group>
          {index === 0 ? (
            <button
              onClick={addTruck}
              style={{
                height: "62px",
                width: "59px",
                backgroundColor: "#0060B8",
                color: "#FFF",
                marginTop: "30px",
              }}
            >
              +
            </button>
          ) : (
            <button
              onClick={() => removeTruck(truck.id)}
              style={{
                height: "62px",
                width: "59px",
                backgroundColor: "#FF8484",
                color: "#FFF",
                marginTop: "30px",
              }}
            >
              -
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default AddTruckForm;
