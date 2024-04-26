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
        <div style={{ display: "flex", gap: "20px" }}>
          <img src={EditIcon} />
          <img src={DeleteIcon} />
          <Link to={"/shipper/proposalssecond"}>
            <img src={ProposalIcon} />
          </Link>
        </div>
      );
    },
  },
];
