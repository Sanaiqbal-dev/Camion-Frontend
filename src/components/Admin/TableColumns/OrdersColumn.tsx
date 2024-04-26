import { ColumnDef } from "@tanstack/react-table";
import IconSaveFile from "../../../assets/icons/ic-file-earmark.svg";
import IconDelete from "../../../assets/icons/ic-delete.svg";
import { Collapse, Card } from "react-bootstrap";
import { useState } from "react";
import { IOrder } from "../../../interface/admin";

export const OrderColumns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "assignedCarrier",
    header: "Assigned Carrier",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "dimentions",
    header: "Dimensions",
  },
  {
    accessorKey: "ETA",
    header: "ETA",
  },

  {
    accessorKey: "status",
    header: "status",
    cell: () => {
      const [open, setOpen] = useState(false);

      return (
        <div>
          <p>
            <div
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              style={{ cursor: "pointer" }}
            >
              Select Status{" "}
              <img src="assets/ic-down.svg" alt="Toggle Dropdown" />
            </div>
          </p>
          <Collapse in={open}>
            <div
              id="example-collapse-text"
              style={{ position: "fixed", zIndex: 1000 }}
            >
              <Card>
                <Card.Body>
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                  </ul>
                </Card.Body>
              </Card>
            </div>
          </Collapse>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return (
        <div className="action-container" style={{ justifyContent: "start" }}>
          <div>
            <img src={IconSaveFile} />
            <span style={{ color: "#27AE60" }}>Save</span>
          </div>
          <div>
            <img src={IconDelete} />
            <span style={{ color: "#EB5757" }}>Delete</span>
          </div>
        </div>
      );
    },
  },
];
