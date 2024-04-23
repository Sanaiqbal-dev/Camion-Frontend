import { ColumnDef } from "@tanstack/react-table";
import IconEdit from "../../../assets/icons/ic-edit.svg";
import IconDelete from "../../../assets/icons/ic-delete.svg";
import { Link } from "react-router-dom";
import { Driver } from "../../../interface/driver";

export const DriverManagementColumns: ColumnDef<Driver>[] = [
  {
    accessorKey: "driverName",
    header: "Driver Name",
  },
  {
    accessorKey: "driverId",
    header: "Driver ID/Iqama",
  },
  {
    accessorKey: "licenseNumber",
    header: "License Number",
  },
  {
    accessorKey: "DOB",
    header: "Date Of Birth",
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
  },

  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
  },

  {
    accessorKey: "viewIqama",
    header: "Iqama/Id",
    cell:()=>{
        return(
            <Link to={""}>View Iqama/ID</Link>
        )
    }
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
        </div>
      );
    },
  },
];
