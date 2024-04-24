import { ColumnDef } from "@tanstack/react-table";
import IconTick from "../../../assets/icons/ic-submitted.svg";
import IconDeleteProfile from "../../../assets/icons/ic-delete-profile.svg";
import IconRejectProfile from "../../../assets/icons/ic-reject-profile.svg";
import { profiles } from "../../../interface/admin";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const ProfileColumns: ColumnDef<profiles>[] = [
  {
    accessorKey: "profileType",
    header: "ProfileType",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "contact",
    header: "Contact Number",
  },
  {
    accessorKey: "company",
    header: "Company Name",
  },
  {
    accessorKey: "CRDocument",
    header: "CR Document",
    cell: () => {
      return <Link to={""}>View Document</Link>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const className_ = clsx({
        "tw-text-orange-500": status === "Not Approved",
        "tw-text-red-500": status === "Deactivated",
        "tw-text-green-500": status === "Active",
      });
      return <span className={className_}>{status}</span>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return status === "Not Approved" ? (
        <div className="tw-flex tw-gap-2">
          <button
            className="table-action-btn"
            style={{
              color: "#0EBC93",
              backgroundColor: "#0EBC931A",
            }}
          >
            <img src={IconTick} />
            Accept
          </button>
          <button
            className="table-action-btn"
            style={{
              color: "#EB5757",
              backgroundColor: "#EB57571A",
            }}
          >
            <img src={IconRejectProfile} />
            Reject
          </button>
        </div>
      ) : status === "Active" ? (
        <div>
          <button
            className="table-action-btn"
            style={{ color: "#F48031", backgroundColor: "#F480311A" }}
          >
            Deactivate
          </button>
        </div>
      ) : (
        <div>
          <button
            className="table-action-btn"
            style={{
              color: "#EB5757",
              backgroundColor: "#EB57571A",
            }}
          >
            <img src={IconDeleteProfile} />
            Delete
          </button>
        </div>
      );
    },
  },
];
