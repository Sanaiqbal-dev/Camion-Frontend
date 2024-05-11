import { ColumnDef } from "@tanstack/react-table";
import IconSubmitted from "../../../assets/icons/ic-submitted.svg";
import { IRequest } from "../../../interface/carrier";

interface RequestActionProps {
  onSubmitProposal: (id: number) => void;
}

export const RequestColumns = ({
  onSubmitProposal,
}: RequestActionProps): ColumnDef<IRequest>[] => [
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
    accessorKey: "EDT",
    header: "EDT",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const isProposalSubmitted = row.original.isProposalSubmitted;
      console.log("id", row.original.id),
        console.log("ISSubmitted", isProposalSubmitted);

      return (
        <button
          onClick={() =>
            !isProposalSubmitted && onSubmitProposal(row.original.id)
          }
          className={
            isProposalSubmitted
              ? "proposal-btn submitted-proposal"
              : "proposal-btn submit-proposal"
          }
          id="submit-proposal-btn"
        >
          {isProposalSubmitted && <img src={IconSubmitted} />}
          {isProposalSubmitted ? "Proposal Submitted" : "Submit proposal"}
        </button>
      );
    },
  },
];
