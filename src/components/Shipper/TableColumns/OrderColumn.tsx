import { ColumnDef } from "@tanstack/react-table";
import DeleteIcon from "../../../assets/icons/ic-delete.svg";
import EditIcon from "../../../assets/icons/ic-edit.svg";
import IconAssignVehicle from "../../../assets/icons/ic-vehicle.svg";

export type Payment = {
  id: string;
  trackingId: string;
  origin: string;
  destination: string;
  weight: string;
  type: string;
  ETA: string;
  status: string;
  action: string;
};
export const OrderColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "trackingId",
    header: "Tracking",
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
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "ETA",
    header: "ETA",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return (
        <div className="action-container" style={{ justifyContent: "start" }}>
          <div>
            <img src={EditIcon} />
            <span style={{ color: "#27AE60" }}>Edit</span>
          </div>
          <div>
            <img src={DeleteIcon} />
            <span style={{ color: "#EB5757" }}>Delete</span>
          </div>
          <div>
            <img src={IconAssignVehicle} />
            <span style={{ color: "#0060B8" }}>Assign Vehicle</span>
          </div>
        </div>
      );
    },
  },
];
