import { ColumnDef } from "@tanstack/react-table";
import DeleteIcon from "../../../assets/icons/ic-delete.svg";
import EditIcon from "../../../assets/icons/ic-edit.svg";
import ProposalIcon from "../../../assets/icons/ic-proposal.svg";
import { IRequestTable } from "@/interface/shipper";

interface RequestActionsProps {
  onEdit: (proposalItemId: number) => void;
  onDelete: (proposalItemId: number) => void;
  onProposalList: (proposalItemId: number) => void;
}
export const RequestColumns = ({
  onEdit,
  onDelete,
  onProposalList,
}: RequestActionsProps): ColumnDef<IRequestTable>[] => [
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
    cell: ({row}) => {
      return (
        <div
          className="action-container"
          style={{ justifyContent: "start", gap: "20px" }}
        >
          <div onClick={() => onEdit(row.original.id)}>
            <img src={EditIcon} />
            <span style={{ color: "#27AE60" }}>Edit</span>
          </div>
          <div onClick={() => onDelete(row.original.id)}>
            <img src={DeleteIcon} />
            <span style={{ color: "#EB5757" }}>Delete</span>
          </div>
          <div onClick={()=> onProposalList(row.original.id)}>
            {/* <Link
              to={"/shipper/proposalssecond"}
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            > */}
            <img src={ProposalIcon} />
            <span style={{ color: "#F2994A" }}>Proposals</span>
            {/* </Link> */}
          </div>
        </div>
      );
    },
  },
];
