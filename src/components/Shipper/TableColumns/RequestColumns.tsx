import { ColumnDef } from "@tanstack/react-table";
import DeleteIcon from "../../../assets/icons/ic-delete.svg";
import EditIcon from "../../../assets/icons/ic-edit.svg";
import ProposalIcon from "../../../assets/icons/ic-proposal.svg";
import { Link } from "react-router-dom";

export type IRequestTableData = {
  id: number;
  origin: string;
  destination: string;
  weight: string;
  dimentions: string;
  ETA: string;
  action: string;
  onProposalClick?: () => void;
};
export const RequestColumns: ColumnDef<IRequestTableData>[] = [
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "dimentions",
    header: "Dimensions",
  },
  {
    accessorKey: "ETA",
    header: "ETA",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return (
        <div
          className="action-container"
          style={{ justifyContent: "start", gap: "20px" }}
        >
          <div>
            <img src={EditIcon} />
            <span style={{ color: "#27AE60" }}>Edit</span>
          </div>
          <div>
            <img src={DeleteIcon} />
            <span style={{ color: "#EB5757" }}>Delete</span>
          </div>
          <div>
            <Link
              to={"/shipper/proposalssecond"}
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={ProposalIcon} />
              <span style={{ color: "#F2994A", marginTop: "5px" }}>
                Proposals
              </span>
            </Link>
          </div>
        </div>
      );
    },
  },
];
