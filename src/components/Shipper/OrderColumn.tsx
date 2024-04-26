import { ColumnDef } from "@tanstack/react-table";
import DeleteIcon from "../../assets/icons/ic-delete.svg";
import EditIcon from "../../assets/icons/ic-edit.svg";
import TrackingIcon from "../../assets/icons/ic-vehicle.svg";

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
        <div style={{ display: "flex", gap: "20px" }}>
          <img
            src={EditIcon}
            onClick={() => console.warn("Not implemented yet")}
          />
          <img
            src={DeleteIcon}
            onClick={() => console.warn("Not implemented yet")}
          />
          <img
            src={TrackingIcon}
            onClick={() => console.warn("Not implemented yet")}
          />
        </div>
      );
    },
  },
];
