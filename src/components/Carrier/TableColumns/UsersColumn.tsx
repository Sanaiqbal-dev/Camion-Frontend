import { ColumnDef } from "@tanstack/react-table";
import IconEdit from "../../../assets/icons/ic-edit.svg";
import IconDelete from "../../../assets/icons/ic-delete.svg";
import { IUserManagement } from "../../../interface/common";

interface UserActionsProps{
  onEdit : () => void;
}

export const UsersColumn = ({
  onEdit,
}: UserActionsProps): ColumnDef<IUserManagement>[] => [
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
