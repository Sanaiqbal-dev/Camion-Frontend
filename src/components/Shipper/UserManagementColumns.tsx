import { ColumnDef } from "@tanstack/react-table";
import DeleteIcon from "../../assets/icons/ic-delete.svg";
import EditIcon from "../../assets/icons/ic-edit.svg";

export type Payment = {
  id: string;
  username: string;
  email: string;
  action: string;
};
export const UserManagementColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "username",
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
        <div style={{ display: "flex", gap: "20px" }}>
          <img
            src={EditIcon}
            onClick={() => console.warn("Not implemented yet")}
          />
          <img
            src={DeleteIcon}
            onClick={() => console.warn("Not implemented yet")}
          />
        </div>
      );
    },
  },
];
