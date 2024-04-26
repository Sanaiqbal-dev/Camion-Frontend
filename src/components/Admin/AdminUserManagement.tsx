import { DataTable } from "../ui/DataTable";
import { AdminUsersColumn } from "./TableColumns/AdminUsersColumn";
import { IAdminUser } from "../../interface/admin";
import CreateUser from "../Modals/CreateUser";
import { useState } from "react";
import UpdatePassword from "../Modals/UpdatePassword";
import { ColumnDef } from "@tanstack/react-table";

const AdminUserManagement = () => {
  const userData: IAdminUser[] = [
    {
      id: "9e19od42",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      password: "1234567823",
      action: "",
    },

    {
      id: "56te1d42",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      password: "1234567823",
      action: "",
    },

    {
      id: "7tf5d52f",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      password: "123",
      action: "",
    },
    {
      id: "720ui72f",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      password: "1234567823",
      action: "",
    },
    {
      id: "728eb92f",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      password: "1234",
      action: "",
    },
    {
      id: "72ted52f",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      password: "1234567823",
      action: "",
    },
    {
      id: "728ed52f",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      password: "12345",
      action: "",
    },
    {
      id: "489e1d42",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      password: "1234567823",
      action: "",
    },

    {
      id: "489e1e742",
      userName: "Ali Abbasi",
      email: "ali_abbasi@mail.com",
      password: "",
      action: "",
    },
  ];
  const [showCreateUserModal, setshowCreateUserModal] = useState(false);
  const [showUpdatePasswordModal, setshowUpdatePasswordModal] = useState(false);

  const onEdit = () => {
    console.log(" Show password clicked");
    setshowUpdatePasswordModal(true);
  };
  const columns: ColumnDef<IAdminUser>[] = AdminUsersColumn({
    onEdit,
  });

  return (
    <div className="table-container">
      <div
        className="search-and-entries-container"
        style={{ flexDirection: "row-reverse" }}
      >
        <button
          className="add-item-btn"
          id="add-user-btn"
          onClick={() => setshowCreateUserModal(true)}
        >
          Create New User
        </button>
      </div>
      {userData && (
        <DataTable isAction={false} columns={columns} data={userData} />
      )}
      <CreateUser
        show={showCreateUserModal}
        handleClose={() => setshowCreateUserModal(false)}
      />
      <UpdatePassword
        show={showUpdatePasswordModal}
        handleClose={() => setshowUpdatePasswordModal(false)}
      />
    </div>
  );
};
export default AdminUserManagement;
