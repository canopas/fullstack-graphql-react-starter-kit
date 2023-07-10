import { useState } from "react";
import reactLogo from "../assets/images/registration-800w.webp";
import { useMutation } from "@apollo/client";
import { CREATE_BUSINESS_MUTATION } from "../graphQL/mutations";
import Modal from "./modal";
import { messages } from "../config/const";
import { validEmail, validPhone } from "../config/utils";

export default function Registration() {
  const user = {
    name: "",
    email: "",
    phone: "",
    city: "",
    businessName: "",
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [formState, setFormState] = useState(user);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [createUser] = useMutation(CREATE_BUSINESS_MUTATION);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (phoneError !== "" || emailError !== "") {
      return;
    }
    try {
      await createUser({
        variables: {
          data: {
            name: formState.name,
            email: formState.email,
            phone: formState.phone,
            city: formState.city,
            business: {
              name: formState.businessName,
            },
          },
        },
      });
      setModalVisible(true);
      setModalTitle("Success");
      setModalContent("Thank you. We will send you approval soon.");
    } catch (error: any) {
      setModalVisible(true);
      setModalTitle("Error");
      setModalContent(error.message || messages.ERROR);
    }
    setFormState(user);
  };

  return (
    <div className="container relative flex flex-col justify-center m-auto w-full min-h-screen overflow-hidden">
      <h1 className="mb-10 text-3xl font-semibold text-center text-indigo-700 text-[2.1875rem] leading-[2.8125rem] md:text-[2.65625rem] md:leading-[3.28125rem] lg:text-[3.28125rem] lg:leading-[3.70625rem] 2xl:text-[4.0625rem] 2xl:leading-[4.6875rem]">
        OmniDashboard
      </h1>
      <h2 className="mb-10 text-3xl font-semibold text-center text-black uppercase">
        Register your business here!!
      </h2>
      <div className="flex flex-col lg:flex-row justify-center w-full ">
        <img
          className="hidden lg:block w-1/2 xl:w-auto"
          src={reactLogo}
          alt="business-people"
        ></img>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4 lg:mt-6 rounded-md bg-gray-200 p-6"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="md:col-span-2">
            <label>
              <span className="text-gray-700">Your name</span>
              <input
                type="text"
                name="name"
                className="block mt-2 w-full border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Your name"
                value={formState.name}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    name: e.target.value,
                  })
                }
              />
            </label>
          </div>
          <div>
            <label>
              <span className="text-gray-700">Phone</span>
              <input
                name="phone"
                type="phone"
                onBlur={() =>
                  setPhoneError(
                    !validPhone(formState.phone)
                      ? "Please enter valid phone number"
                      : "",
                  )
                }
                className="block mt-2 w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your phone number"
                value={formState.phone}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    phone: e.target.value,
                  })
                }
                required
              />
              {phoneError != "" ? (
                <span className="text-red-400">{phoneError}</span>
              ) : (
                ""
              )}
            </label>
          </div>
          <div>
            <label>
              <span className="text-gray-700">City</span>
              <input
                name="city"
                type="text"
                className="block mt-2 w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your city"
                value={formState.city}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    city: e.target.value,
                  })
                }
                required
              />
            </label>
          </div>
          <div className="md:col-span-2">
            <label>
              <span className="text-gray-700">Email address</span>
              <input
                name="email"
                type="email"
                className="block mt-2 w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your email address"
                value={formState.email}
                onBlur={() =>
                  setEmailError(
                    !validEmail(formState.email)
                      ? "Please enter valid email"
                      : "",
                  )
                }
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value,
                  })
                }
                required
              />
              {emailError != "" ? (
                <span className="text-red-400">{emailError}</span>
              ) : (
                ""
              )}
            </label>
          </div>
          <div className="md:col-span-2">
            <label>
              <span className="text-gray-700">Business name</span>
              <input
                name="Your business name"
                type="text"
                className="block mt-2 w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your business name"
                value={formState.businessName}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    businessName: e.target.value,
                  })
                }
                required
              />
            </label>
          </div>

          <div className="md:col-span-2 text-center lg:text-left">
            <button
              type="submit"
              className="h-10 rounded-lg bg-indigo-700 px-5 text-indigo-100 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800 "
            >
              Register
            </button>
          </div>
          {modalVisible ? (
            <Modal
              visible={modalVisible}
              title={modalTitle}
              content={modalContent}
            />
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}
