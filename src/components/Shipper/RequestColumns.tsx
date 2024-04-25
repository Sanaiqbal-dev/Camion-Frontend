import { ColumnDef } from "@tanstack/react-table";
import DeleteIcon from "../../assets/icons/ic-delete.svg";
import EditIcon from "../../assets/icons/ic-edit.svg";
import ProposalIcon from "../../assets/icons/ic-proposal.svg";

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
          <img
            src={EditIcon}
            onClick={() => console.warn("Not implemented yet")}
          />
          <img
            src={DeleteIcon}
            onClick={() => console.warn("Not implemented yet")}
          />
          <img
            src={ProposalIcon}
            onClick={() => console.warn("Not implemented yet")}
          />
        </div>
      );
    },
  },
];
