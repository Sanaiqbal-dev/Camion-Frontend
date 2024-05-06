import { ColumnDef } from "@tanstack/react-table";
import IconSubmitted from "../../../assets/icons/ic-submitted.svg";
import { IRequest } from "../../../interface/carrier";

interface RequestActionProps {
  onSubmitProposal: (id: number) => void;
  submissionStatus: { [key: number]: boolean };
}

export const RequestColumns = ({
  onSubmitProposal,
  submissionStatus,
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
      const isSubmitted = submissionStatus[row.original.id];

      return (
        <button
          onClick={() => onSubmitProposal(row.original.id)}
          className={
            isSubmitted
              ? "proposal-btn submitted-proposal"
              : "proposal-btn submit-proposal"
          }
          id="submit-proposal-btn"
        >
          {isSubmitted && <img src={IconSubmitted} />}
          {isSubmitted ? "Proposal Submitted" : "Submit proposal"}
        </button>
      );
    },
  },
];
