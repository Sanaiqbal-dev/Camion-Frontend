import { Payment, Proposals1Column } from "./TableColumns/Proposals1Columns";
import { DataTable } from "../ui/DataTable";

const ProposalsSecond = () => {
  const data: Payment[] = [
    {
      id: "728ed52f",
      transportInc: "",
      status: "Ready to Ship",
      origin: "Sauda Arabia",
      destination: "Dublin, Ireland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ammount: "9/20/2024",
      action: "",
    },
    {
      id: "489e1d42",
      transportInc: "",
      status: "Ready to Ship",
      origin: "Sauda Arabia",
      destination: "Dublin, Ireland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ammount: "9/20/2024",
      action: "",
    },

    {
      id: "489e1e742",
      transportInc: "",
      status: "Ready to Ship",
      origin: "Sauda Arabia",
      destination: "Dublin, Ireland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ammount: "9/20/2024",
      action: "",
    },

    {
      id: "9e19od42",
      transportInc: "",
      status: "Ready to Ship",
      origin: "Sauda Arabia",
      destination: "Dublin, Ireland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ammount: "9/20/2024",
      action: "",
    },

    {
      id: "56te1d42",
      transportInc: "",
      status: "Ready to Ship",
      origin: "Sauda Arabia",
      destination: "Dublin, Ireland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ammount: "9/20/2024",
      action: "",
    },
    {
      id: "7tf5d52f",
      transportInc: "",
      status: "Ready to Ship",
      origin: "Sauda Arabia",
      destination: "Dublin, Ireland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ammount: "9/20/2024",
      action: "",
    },
    {
      id: "720ui72f",
      transportInc: "",
      status: "Ready to Ship",
      origin: "Sauda Arabia",
      destination: "Dublin, Ireland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ammount: "9/20/2024",
      action: "",
    },
    {
      id: "728eb92f",
      transportInc: "",
      status: "Ready to Ship",
      origin: "Sauda Arabia",
      destination: "Dublin, Ireland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ammount: "9/20/2024",
      action: "",
    },
    {
      id: "72ted52f",
      transportInc: "",
      status: "Ready to Ship",
      origin: "Sauda Arabia",
      destination: "Dublin, Ireland",
      weight: "82.5 kg",
      dimentions: "45x45x45",
      ammount: "9/20/2024",
      action: "",
    },
  ];

  return (
    <div className="table-container">
      {data && (
        <DataTable columns={Proposals1Column} data={data} isAction={false} />
      )}
    </div>
  );
};
export default ProposalsSecond;
