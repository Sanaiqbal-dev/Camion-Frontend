import { ColumnDef } from "@tanstack/react-table";
import DeleteIcon from "../../../assets/icons/ic-delete.svg";
import EditIcon from "../../../assets/icons/ic-edit.svg";
import { IUser } from "../../../interface/common";

interface UserActionsProps {
  onEdit: () => void;
}
export const UserManagementShipperColumns = ({
  onEdit,
}: UserActionsProps): ColumnDef<IUser>[] => [
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return (
        <div className="action-container" style={{ justifyContent: "start" }}>
          <div onClick={() => onEdit()}>
            <img src={EditIcon} />
            <span style={{ color: "#27AE60" }}>Edit</span>
          </div>
          <div>
            <img src={DeleteIcon} />
            <span style={{ color: "#EB5757" }}>Delete</span>
          </div>
        </div>
      );
    },
  },
];
