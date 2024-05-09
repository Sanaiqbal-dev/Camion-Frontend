import { ColumnDef } from "@tanstack/react-table";
import IconEdit from "../../../assets/icons/ic-edit.svg";
import IconDelete from "../../../assets/icons/ic-delete.svg";
import { Link } from "react-router-dom";
import { IDriver } from "../../../interface/carrier";

interface DriverActionProps {
  onDeleteDriver: (id: number) => void;
  onUpdateDriver: (id: number) => void;
}

export const DriverManagementColumns = ({
  onDeleteDriver,
  onUpdateDriver,
}: DriverActionProps): ColumnDef<IDriver>[] => [
  {
    accessorKey: "driverName",
    header: "Driver Name",
  },
  {
    accessorKey: "iqamaId",
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
    cell: () => {
      return <Link to={""}>View Iqama/ID</Link>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="action-container" style={{ justifyContent: "start" }}>
          <div onClick={() => onUpdateDriver(row.original.id)}>
            <img src={IconEdit} />
            <span style={{ color: "#27AE60" }}>Edit</span>
          </div>
          <div onClick={() => onDeleteDriver(row.original.id)}>
            <img src={IconDelete} />
            <span style={{ color: "#EB5757" }}>Delete</span>
          </div>
        </div>
      );
    },
  },
];
