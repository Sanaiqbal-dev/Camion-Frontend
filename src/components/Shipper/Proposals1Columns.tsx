import { ColumnDef } from "@tanstack/react-table";
import TickIcon from "../../assets/icons/ic-tickIcon.svg";
import CrossIcon from "../../assets/icons/ic-crossIcon.svg";
import CompanyLogo from "../../assets/icons/companyLogo.svg";

export type Payment = {
  id: string;
  transportInc: string;
  status: string;
  origin: string;
  destination: string;
  weight: string;
  dimentions: string;
  ammount: string;
  action: string;
};
export const Proposals1Column: ColumnDef<Payment>[] = [
  {
    accessorKey: "transportInc",
    header: "Transport Inc",
    cell: () => {
      return (
        <div style={{ display: "flex", gap: "20px" }}>
          <img src={CompanyLogo} />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
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
    accessorKey: "ammount",
    header: "Ammount",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return (
        <div style={{ display: "flex", gap: "20px" }}>
          <img
            src={TickIcon}
            onClick={() => console.warn("Not implemented yet")}
          />
          <img
            src={CrossIcon}
            onClick={() => console.warn("Not implemented yet")}
          />
        </div>
      );
    },
  },
];
