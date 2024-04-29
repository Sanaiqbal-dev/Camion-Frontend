import { ColumnDef } from "@tanstack/react-table";
import DeleteIcon from "../../../assets/icons/ic-delete.svg";
import EditIcon from "../../../assets/icons/ic-edit.svg";
import ProposalIcon from "../../../assets/icons/ic-proposal.svg";
import { Link } from "react-router-dom";

export type Payment = {
  id: string;
  origin: string;
  destination: string;
  weight: string;
  dimentions: string;
  ETA: string;
  action: string;
  onProposalClick?: () => void;
};
export const RequestColumns: ColumnDef<Payment>[] = [
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
        // <div style={{ display: "flex", gap: "20px" }}>
        //   <img src={EditIcon} />
        //   <img src={DeleteIcon} />
        //
        //     <img src={ProposalIcon} />
        //
        // </div>
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
            <Link to={"/shipper/proposalssecond"}>
              <img
                src={ProposalIcon}
                style={{ width: "57px", height: "34px" }}
              />
              {/* <span style={{ color: "#F2994A" }}>Proposals</span> */}
            </Link>
          </div>
        </div>
      );
    },
  },
];
