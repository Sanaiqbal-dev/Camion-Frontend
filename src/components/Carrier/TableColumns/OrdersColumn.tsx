import { ColumnDef } from "@tanstack/react-table";
import IconSaveFile from "../../../assets/icons/ic-file-earmark.svg";
import IconAssignVehicle from "../../../assets/icons/ic-vehicle.svg";
import IconDelete from "../../../assets/icons/ic-delete.svg";
import IconPrintBill from "../../../assets/icons/ic-printer.svg";

export type Order = {
  id: string;
  origin: string;
  destination: string;
  weight: string;
  dimentions: string;
  ETA: string;
  status: string;
  action: string;
};
export const OrderColumns: ColumnDef<Order>[] = [
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
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return (
        <div className="action-container" style={{ justifyContent: "start" }}>
          <div>
            <img src={IconSaveFile} />
            <span style={{ color: "#27AE60" }}>Share</span>
          </div>
          <div>
            <img src={IconDelete} />
            <span style={{ color: "#EB5757" }}>Delete</span>
          </div>
          <div id="assign-vehicle">
            <img src={IconAssignVehicle} />
            <span style={{ color: "#0060B8" }}>Assign Vehicle</span>
          </div>
          <div style={{ marginLeft: "10px" }}>
            <img src={IconPrintBill} />
            <span style={{ color: "#F48031" }}>Print Bayan Bill</span>
          </div>
        </div>
      );
    },
  },
];
