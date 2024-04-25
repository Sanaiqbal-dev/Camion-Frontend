import { ColumnDef } from "@tanstack/react-table";
import IconSubmitted from "../../../assets/icons/ic-submitted.svg";
import { Request } from "../../../interface/carrier";

export const RequestColumns: ColumnDef<Request>[] = [
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
