import { ColumnDef } from "@tanstack/react-table";
import IconDownload from "../../../assets/icons/ic-download.svg";
import { IRequest } from "../../../interface/carrier";

export const ReportsColumn: ColumnDef<IRequest>[] = [
  {
    accessorKey: "userType",
    header: "User Type",
  },
  {
    accessorKey: "shipperName",
    header: "Shipper Name",
  },
  {
    accessorKey: "contact",
    header: "Contact Number",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "activeOrders",
    header: "Number of Active Orders",
  },
  {
    accessorKey: "report",
    header: "Report",
    cell: () => {
      return (
        <button
          className="table-action-btn"
          style={{ backgroundColor: "#0060B81A" }}
        >
          <img src={IconDownload} />
          <span style={{ color: "#0060B8" }}>Download Report</span>
        </button>
      );
    },
  },
];
