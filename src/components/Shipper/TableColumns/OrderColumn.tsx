import { ColumnDef } from "@tanstack/react-table";
import DeleteIcon from "../../../assets/icons/ic-delete.svg";
import IconTrackOrder from "../../../assets/icons/ic-vehicle.svg";
import IconTrackOrderDisabled from "../../../assets/icons/ic-vehicle-disabled.svg";
import { IOrderTable } from "@/interface/shipper";

interface OrderActionsProps {
  onDelete: (orderItemId: number) => void;
  onTrackOrder: (orderItemId: number) => void;
}
export const OrderColumns = ({
  onDelete,
  onTrackOrder,
}: OrderActionsProps): ColumnDef<IOrderTable>[] => [
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
    cell: ({ row }) => {
      let isEnabled = row.original.status === "Driver Assigned";
      return (
        <div className="action-container" style={{ justifyContent: "start" }}>
          <div onClick={() => onDelete(row.original.id)}>
            <img src={DeleteIcon} />
            <span style={{ color: "#EB5757" }}>Delete</span>
          </div>
          <div onClick={() => isEnabled && onTrackOrder(row.original.id)}>
            <img src={isEnabled ? IconTrackOrder : IconTrackOrderDisabled} />
            <span
              className={isEnabled ? "trackingEnabled" : "trackingDisabled"}
            >
              Track
            </span>
          </div>
        </div>
      );
    },
  },
];
