// import { Form, Button } from "react-bootstrap";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// import { useGetTruckTypesQuery } from "@/services/shipmentType";
// import { IProposalResponseData, IShipmentDetails } from "@/interface/proposal";
// import {
//   ITruckShipmentDetails,
//   IShipmentTruckType,
//   ITruckTypes,
// } from "@/interface/proposal";
// import { z } from "zod";

// interface IPalletForm {
//   isEdit: boolean;
//   proposalObject?: IProposalResponseData;
//   onSubmitShipmentForm: (
//     data: IShipmentDetails[],
//     shipmentType: string
//   ) => void;
// }

// interface ITruckItem {
//   noOfTruck: number;
//   truckTypeId: string;
// }

// const schema = z.object({
//   noOfTruck: z.number().int().min(1, "Enter number of trucks"),
//   truckTypeId: z.number().int().min(1, "Please select at least one option"),
// });

// const AddTruckForm: React.FC<IPalletForm> = ({
//   isEdit,
//   proposalObject,
//   onSubmitShipmentForm,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     getValues,
//     reset,
//   } = useForm();

//   const [trucks, setTrucks] = useState<IShipmentTruckType[]>([]);
//   const truckTypesData = useGetTruckTypesQuery();

//   const addTruck = (truckItem?: ITruckItem) => {
//     if (truckItem) {
//       setTrucks((prevTrucks) => [
//         ...prevTrucks,
//         {
//           noOfTruck: truckItem.noOfTruck,
//           truckTypeId: +truckItem.truckTypeId,
//         },
//       ]);
//     } else {
//       setTrucks((prevTrucks) => [
//         ...prevTrucks,
//         { noOfTruck: 1, truckTypeId: -1 },
//       ]);
//     }
//   };

//   const removeTruck = (index: number) => {
//     console.log(trucks);
//     setTrucks((prevTrucks) => prevTrucks.filter((_, i) => i !== index));
//   };

//   const onSubmit: SubmitHandler<ITruckItem[]> = (data) => {
//     // console.log(trucks);

//     const isValid = data.every((truck) => {
//       try {
//         schema.parse(truck);
//         return true;
//       } catch (error) {
//         return false;
//       }
//     });

//     if (isValid) {
//       onSubmitShipmentForm(data, "Truck");
//       reset(); // Reset form after submission
//     }
//   };

//   useEffect(() => {
//     if (isEdit && proposalObject) {
//       const truckShipmentDetails: ITruckShipmentDetails[] =
//         proposalObject.truckShipmentDetail || [];

//       const trucksData = truckShipmentDetails.map((obj) => ({
//         noOfTruck: obj.noOfTrucks,
//         truckTypeId: +obj.truckTypeId,
//       }));

//       setTrucks(trucksData);
//     } else {
//       addTruck();
//     }
//   }, [isEdit, proposalObject]);

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       {trucks.map((truck, index) => (
//         <div key={index} style={{ display: "flex", gap: "18px" }}>
//           <Form.Group className="mb-3">
//             <Form.Label>Number of Trucks</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="1"
//               defaultValue={truck && truck.noOfTruck}
//               style={{ width: "229px", height: "59px" }}
//               isInvalid={!!errors[index]?.noOfTruck}
//               {...register(`${index}.noOfTruck` as const)}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors[index]?.noOfTruck?.message}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Type of truck</Form.Label>
//             <Form.Control
//               as="select"
//               style={{ width: "229px", height: "59px" }}
//               defaultValue={truck && truck.truckTypeId}
//               {...register("truckTypeId", {
//                 required: "truck is required",
//               })}
//             >
//               <option value="">Select Truck Type</option>
//               {truckTypesData?.data?.map((item: ITruckTypes, index: number) => {
//                 return (
//                   <option key={index} value={item.id}>
//                     {item.name}
//                   </option>
//                 );
//               })}
//             </Form.Control>
//             <Form.Control.Feedback type="invalid">
//               {errors[index]?.truckTypeId?.message}
//             </Form.Control.Feedback>
//           </Form.Group>
//           {index === 0 ? (
//             <button
//               type="button"
//               onClick={() => addTruck()}
//               style={{
//                 height: "62px",
//                 width: "59px",
//                 backgroundColor: "#0060B8",
//                 color: "#FFF",
//                 marginTop: "30px",
//               }}
//             >
//               +
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={() => removeTruck(index)}
//               style={{
//                 height: "62px",
//                 width: "59px",
//                 backgroundColor: "#FF8484",
//                 color: "#FFF",
//                 marginTop: "30px",
//               }}
//             >
//               -
//             </button>
//           )}
//         </div>
//       ))}
//       <Button className="tw-ml-auto tw-mr-auto" variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default AddTruckForm;

import { Form, Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGetTruckTypesQuery } from "@/services/shipmentType";
import { IProposalDetailResponseData } from "@/interface/proposal";
import {
  ITruckTypes,
} from "@/interface/proposal";
import { z } from "zod";

interface IPalletForm {
  isEdit: boolean;
  proposalObject?: IProposalDetailResponseData;
  onSubmitShipmentForm: (data: ITruckItem[], shipmentType: string) => void;
}

interface ITruckItem {
  noOfTrucks: number;
  truckTypeId: number;
}

const schema = z.object({
  noOfTrucks: z.number().int().min(1, "Enter number of trucks"),
  truckTypeId: z.number().int().min(1, "Please select a truck type"),
});

const AddTruckForm: React.FC<IPalletForm> = ({
  isEdit,
  proposalObject,
  onSubmitShipmentForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [trucks, setTrucks] = useState<ITruckItem[]>([]);
  const truckTypesData = useGetTruckTypesQuery();

  const addTruck = () => {
    setTrucks((prevTrucks) => [
      ...prevTrucks,
      { noOfTrucks: 0, truckTypeId: -1 },
    ]);
  };

  const removeTruck = (index: number) => {
    setTrucks((prevTrucks) => prevTrucks.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    const formData: ITruckItem[] = Object.keys(data).map((key) => ({
      noOfTrucks: parseInt(data[key].noOfTrucks), // Convert to number
      truckTypeId: parseInt(data[key].truckTypeId),
    }));

    const isValid = formData.every((truck) => {
      try {
        schema.parse(truck);
        return true;
      } catch (error) {
        return false;
      }
    });

    if (isValid) {
      onSubmitShipmentForm(formData, "Truck");
      reset(); // Reset form after submission
    }
  };

  useEffect(() => {
    if (isEdit && proposalObject) {
      const truckShipmentDetails = proposalObject.result.truckShipmentDetail;
      console.log(truckShipmentDetails);
      const trucksData = truckShipmentDetails.map((obj) => ({
        noOfTrucks: obj.noOfTrucks,
        truckTypeId: obj.truckTypeId,
      }));

      setTrucks(trucksData);
    } else {
      addTruck();
    }
  }, [isEdit, proposalObject]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {trucks.map((truck, index) => (
        <div key={index} style={{ display: "flex", gap: "18px" }}>
          <Form.Group className="mb-3">
            <Form.Label>Number of Trucks</Form.Label>
            <Form.Control
              type="number"
              placeholder="1"
              defaultValue={truck && parseInt(truck.noOfTrucks)} // Convert to number
              style={{ width: "229px", height: "59px" }}
              isInvalid={!!errors[index]?.noOfTrucks}
              {...register(`${index}.noOfTrucks` as const)}
            />
            <Form.Control.Feedback type="invalid">
              {errors[index]?.noOfTrucks?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type of truck</Form.Label>

            <Form.Control
              as="select"
              style={{ width: "229px", height: "59px" }}
              defaultValue={truck && truck.truckTypeId}
              isInvalid={!!errors[index]?.truckTypeId}
              {...register(`${index}.truckTypeId` as const, {
                required: "Truck type is required",
              })}
            >
              <option value="">Select Truck Type</option>
              {truckTypesData?.data?.map((item: ITruckTypes, index: number) => (
                <option
                  key={index}
                  value={item.id}
                  selected={
                    item.id === truck?.truckTypeId
                  }
                >
                  {item.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors[index]?.truckTypeId?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {index === 0 ? (
            <button
              type="button"
              onClick={() => addTruck()}
              style={{
                height: "62px",
                width: "59px",
                backgroundColor: "#0060B8",
                color: "#FFF",
                marginTop: "30px",
              }}
            >
              +
            </button>
          ) : (
            <button
              type="button"
              onClick={() => removeTruck(index)}
              style={{
                height: "62px",
                width: "59px",
                backgroundColor: "#FF8484",
                color: "#FFF",
                marginTop: "30px",
              }}
            >
              -
            </button>
          )}
        </div>
      ))}
      <Button className="tw-ml-auto tw-mr-auto" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddTruckForm;
