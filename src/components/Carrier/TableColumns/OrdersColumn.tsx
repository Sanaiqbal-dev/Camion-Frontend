import { ColumnDef } from "@tanstack/react-table";
import IconSaveFile from "../../../assets/icons/ic-file-earmark.svg";
import IconAssignVehicle from "../../../assets/icons/ic-vehicle.svg";
import IconDelete from "../../../assets/icons/ic-delete.svg";
import IconPrintBill from "../../../assets/icons/ic-printer.svg";
import IconDown from "../../../assets/icons/ic-down.svg";
import { IOrder } from "../../../interface/carrier";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../@/components/ui/dropdown-menu";
import { Button } from "../../../../@/components/ui/button";

interface OrderActionsProps {
  onSave: (orderItemId: string) => void;
  onDelete: (orderItemId: string) => void;
  onAssignVehicle: (orderItemId: string) => void;
  onPrintBill: (orderItemId: string) => void;
  onUpdateStatus: (id: string, statusVal: string) => void;
}
export const OrderColumns = ({
  onSave,
  onDelete,
  onAssignVehicle,
  onPrintBill,
  onUpdateStatus,
}: OrderActionsProps): ColumnDef<IOrder>[] => [
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
    cell: ({ row }) => {
      const item = row.original;
      const noItemSeleted = ( <span>Select Status <img src={IconDown} /></span>);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>

            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only tw-flex tw-gap-1">
                {item.status ? item.status : noItemSeleted}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="tw-flex tw-flex-col tw-gap-2 tw-p-2"
            align="end"
          >
            <DropdownMenuItem
              className="hover:tw-bg-black hover:tw-text-white"
              onClick={() => onUpdateStatus(item.id, "waiting")}
            >
              Waiting
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:tw-bg-black hover:tw-text-white"
              onClick={() => onUpdateStatus(item.id, "enroute")}
            >
              Enroute
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:tw-bg-black hover:tw-text-white"
              onClick={() => onUpdateStatus(item.id, "delivered")}
            >
              Delivered
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="action-container" style={{ justifyContent: "start" }}>
          <div onClick={() => onSave(row.original.id)}>
            <img src={IconSaveFile} />
            <span style={{ color: "#27AE60" }}>Save</span>
          </div>
          <div onClick={() => onDelete(row.original.id)}>
            <img src={IconDelete} />
            <span style={{ color: "#EB5757" }}>Delete</span>
          </div>
          <div onClick={() => onAssignVehicle(row.original.id)}>
            <img src={IconAssignVehicle} />
            <span style={{ color: "#0060B8" }}>Assign Vehicle</span>
          </div>
          <div
            style={{ marginLeft: "10px" }}
            onClick={() => onPrintBill(row.original.id)}
          >
            <img src={IconPrintBill} />
            <span style={{ color: "#F48031" }}>Print Bayan Bill</span>
          </div>
        </div>
      );
    },
  },
];
