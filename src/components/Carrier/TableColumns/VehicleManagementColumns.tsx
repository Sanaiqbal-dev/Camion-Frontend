import { ColumnDef } from "@tanstack/react-table";
import IconEdit from "../../../assets/icons/ic-edit.svg";
import IconDelete from "../../../assets/icons/ic-delete.svg";
import IconDriver from "../../../assets/icons/ic-driver.svg";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Vehicle } from "../../../interface/carrier";

export const VehicleManagementColumns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "driverName",
    header: "Driver Name",
    cell: ({ row }) => {
      return (
        <div
          className={clsx({
            "tw-text-red-600":
              row.getValue("driverName") === "Driver Not Assign",
          })}
        >
          {row.getValue("driverName")}
        </div>
      );
    },
  },
  {
    accessorKey: "vehicleType",
    header: "Vehicle Type",
  },
  {
    accessorKey: "modelYear",
    header: "Model Year",
  },
  {
    accessorKey: "vehicleNumber",
    header: "Vehihcle Number",
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
    accessorKey: "IMEINumber",
    header: "IMEI Number",
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
    cell: () => {
      return (
        <div className="action-container" style={{ justifyContent: "start" }}>
          <div>
            <img src={IconEdit} />
            <span style={{ color: "#27AE60" }}>Edit</span>
          </div>
          <div>
            <img src={IconDelete} />
            <span style={{ color: "#EB5757" }}>Delete</span>
          </div>
          <div id="assign-driver">
            <img src={IconDriver} />
            <span style={{ color: "#0060B8" }}>Assign Driver</span>
          </div>
        </div>
      );
    },
  },
];
