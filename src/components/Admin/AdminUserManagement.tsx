import { DataTable } from "../ui/DataTable";
import { AdminUsersColumn } from "./TableColumns/AdminUsersColumn";
import { IAdminUser } from "../../interface/admin";
import CreateUser from "../Modals/CreateUser";
import { useState } from "react";

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
    const [showCreateUser, setshowCreateUser] = useState(false);

  return (
    <div className="table-container">
      <div
        className="search-and-entries-container"
        style={{ flexDirection: "row-reverse" }}
      >
        <button className="add-item-btn" id="add-driver-btn"onClick={() => setshowCreateUser(true)}>
          Create New User
        </button>
      </div>
      {userData && <DataTable columns={AdminUsersColumn} data={userData} />}
      <CreateUser
        show={showCreateUser}
        handleClose={() => setshowCreateUser(false)}
      />
    </div>
  );
};
export default AdminUserManagement;
