import { Payment, RequestColumns } from "../RequestColumns";
import { DataTable } from "../ui/DataTable";

const Requests = () => {
  const data : Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
  ];
  console.log(typeof data);
  console.log(data);

  return (
    <div className="container mx-auto py-10">
      {data && <DataTable columns={RequestColumns} data={data} />}
    </div>
  );
};
export default Requests;
