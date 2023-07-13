import { useMutation, useQuery } from "@apollo/client";
import { GET_BUSINESS_DETAILS_AND_TYPES } from "../../graphQL/queries";
import DefaultLayout from "../../layout/DefaultLayout";
import { messages } from "./../../config/const";
import { useEffect, useState } from "react";
import { UPDATE_BUSINESS_DETAILS } from "../../graphQL/mutations";
import ErrorAlert from "../Alerts/Error";
import SuccessAlert from "../Alerts/Success";

const BusinessDetail = () => {
  // states
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [types, setTypes] = useState([]);
  const [formState, setFormState] = useState({
    id: 0,
    name: "",
    business_type_id: 0,
    description: "",
    address: "",
    city: "",
  });

  // variables
  const linkId = localStorage.getItem("businessId");

  //Query and mutations
  const [updateDetails] = useMutation(UPDATE_BUSINESS_DETAILS);
  const { loading, error, data }: any = useQuery(
    GET_BUSINESS_DETAILS_AND_TYPES,
    {
      variables: { linkId: linkId },
    },
  );
  useEffect(() => {
    if (data) {
      const d = data.businessDetails;
      let user = {
        id: d.id,
        name: d.name,
        business_type_id: d.business_type_id,
        description: d.description,
        address: d.address,
        city: d.city,
      };
      setFormState(user);
      setTypes(data.businessTypes);
    }
  }, [data]);

  if (loading) return null;
  if (error) {
    setErrorAlert(true);
    setModalTitle("Error");
    setModalContent(error.message || messages.ERROR);
  }

  // methods
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updateDetails({
        variables: {
          linkId: linkId,
          data: {
            name: formState.name,
            description: formState.description,
            business_type_id: formState.business_type_id,
            address: formState.address,
            city: formState.city,
          },
        },
      });
      setSuccessAlert(true);
      setModalTitle("Success");
      setModalContent("Details saved successfully!!");
    } catch (error: any) {
      setErrorAlert(true);
      setModalTitle("Error");
      setModalContent(error.message || messages.ERROR);
    }
  };

  return (
    <DefaultLayout>
      {errorAlert ? (
        <ErrorAlert
          visible={errorAlert}
          title={modalTitle}
          content={modalContent}
        />
      ) : successAlert ? (
        <SuccessAlert
          visible={successAlert}
          title={modalTitle}
          content={modalContent}
        />
      ) : (
        ""
      )}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="p-6.5">
            <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
              Your Business details
            </h2>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter business name"
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Business type
                </label>
                <select
                  value={formState.business_type_id}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      business_type_id: parseInt(e.target.value),
                    })
                  }
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent p-3 outline-none transition focus:border-primary active:border-primary dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue"
                >
                  {types.map((type: any) => (
                    <option key={type.id} value={type.id}>
                      {type.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter business description"
                  value={formState.description}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                ></textarea>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Address
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter business address"
                  value={formState.address}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      address: e.target.value,
                    })
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                ></textarea>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  City
                </label>
                <input
                  type="text"
                  value={formState.city}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      city: e.target.value,
                    })
                  }
                  placeholder="Enter business city"
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default BusinessDetail;
