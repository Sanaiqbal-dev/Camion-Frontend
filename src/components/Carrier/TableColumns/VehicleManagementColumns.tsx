import { ColumnDef } from "@tanstack/react-table";
import IconEdit from "../../../assets/icons/ic-edit.svg";
import IconDelete from "../../../assets/icons/ic-delete.svg";
import IconDriver from "../../../assets/icons/ic-driver.svg";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { IVehicle } from "../../../interface/carrier";

export const VehicleManagementColumns = ({
  assignDriver,
  editVehicle,
  deleteVehicle,
}: {
  assignDriver: (id: number) => void;
  editVehicle: (id: number) => void;
  deleteVehicle: (id: number) => void;
}): ColumnDef<IVehicle>[] => [
  {
    accessorKey: "driverName",
    header: "Driver Name",
    cell: ({ row }) => {
      return (
        <div
          className={clsx({
            "tw-text-red-600": !row.original.driver,
          })}
        >
          {row.original.driver ?? "Driver Not Assign"}
        </div>
      );
    },
  },
  {
    accessorKey: "vehicleType",
    header: "Vehicle Type",
    cell: ({ row }) => {
      return <div>{row.original.vehicleType.typeName}</div>;
    },
  },
  {
    accessorKey: "modelYear",
    header: "Model Year",
  },
  {
    accessorKey: "numberPlate",
    header: "Vehihcle Number",
    cell: ({ row }) => {
      return <div>{row.original.numberPlate}</div>;
    },
  },
  {
    accessorKey: "color",
    header: "Color",
  },

  {
    accessorKey: "registrationNumber",
    header: "Registration Number",
  },

  {
    accessorKey: "imeiNumber",
    header: "IMEI Number",
    cell: ({ row }) => {
      return <div>{row.original.imeiNumber}</div>;
    },
  },

  {
    accessorKey: "vehicleRegistration",
    header: "Vehicle Registration",
    cell: () => {
      return <Link to={""}>View Document</Link>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="action-container" style={{ justifyContent: "start" }}>
          <div>
            <img src={IconEdit} />
            <span
              style={{ color: "#27AE60" }}
              onClick={() => {
                editVehicle(row.original.id);
              }}
            >
              Edit
            </span>
          </div>
          <div>
            <img src={IconDelete} />
            <span
              style={{ color: "#EB5757" }}
              onClick={() => deleteVehicle(row.original.id)}
            >
              Delete
            </span>
          </div>
          <div id="assign-driver">
            <img src={IconDriver} />
            <span
              style={{ color: "#0060B8" }}
              onClick={() => {
                assignDriver(row.original.id);
              }}
            >
              Assign Driver
            </span>
          </div>
        </div>
      );
    },
  },
];
