import { ColumnDef } from "@tanstack/react-table";
import IconSubmitted from "../../../assets/icons/ic-submitted.svg";
import { IRequest } from "../../../interface/carrier";

interface RequestActionProps {
  onSubmitProposal: () => void;
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
      const isSubmitted = row.getValue("action") === "Submit Proposal";

      return (
        <button
          onClick={() => isSubmitted && onSubmitProposal()}
          className={
            isSubmitted
              ? "proposal-btn submit-proposal"
              : "proposal-btn submitted-proposal"
          }
          id="submit-proposal-btn"
        >
          {!isSubmitted && <img src={IconSubmitted} />}
          {row.getValue("action")}
        </button>
      );
    },
  },
];
