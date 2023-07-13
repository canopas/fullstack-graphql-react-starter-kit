import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../graphQL/queries";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumb";
import { roles, messages } from "./../../config/const";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UPDATE_USER } from "../../graphQL/mutations";
import { validEmail } from "../../config/utils";
import ErrorAlert from "../Alerts/Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const UserEdit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formState, setFormState] = useState({
    id: 0,
    name: "",
    email: "",
    role_id: "3",
    username: "",
    password: "",
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const { loading, error, data }: any = useQuery(GET_USER, {
    variables: { id },
  });

  const lUser = localStorage.getItem("user");
  const loggedInUser = lUser != null ? JSON.parse(lUser) : {};

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  useEffect(() => {
    if (data) {
      const u = data.businessUser;
      let user = {
        id: u.id,
        name: u.name,
        email: u.email,
        role_id: u.role_id,
        username: u.username,
        password: u.password,
      };
      setFormState(user);
    }
  }, [data]);

  if (loading) return null;
  if (error) {
    setModalVisible(true);
    setModalTitle("Error");
    setModalContent(error.message || messages.ERROR);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (emailError !== "") {
      return;
    }

    try {
      await updateUser({
        variables: {
          id: id,
          data: {
            name: formState.name,
            email: formState.email,
            role_id: parseInt(formState.role_id),
            username: formState.username,
            password: formState.password,
          },
        },
      });
      navigate("/");
    } catch (error: any) {
      setModalVisible(true);
      setModalTitle("Error");
      setModalContent(error.message || messages.ERROR);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="UserEdit" />

      {modalVisible ? (
        <ErrorAlert
          visible={modalVisible}
          title={modalTitle}
          content={modalContent}
        />
      ) : (
        ""
      )}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Edit User</h3>
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="p-6.5">
            <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
              User details
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
                  placeholder="Enter your first name"
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email <span className="text-brightRed">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      email: e.target.value,
                    })
                  }
                  required
                  onBlur={() =>
                    setEmailError(
                      !validEmail(formState.email)
                        ? "Please enter valid email"
                        : "",
                    )
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                />
                {emailError != "" ? (
                  <span className="text-red-400">{emailError}</span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={formState.username}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      username: e.target.value,
                    })
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                />
              </div>

              {formState.id !== loggedInUser.id ? (
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter password"
                      value={formState.password}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          password: e.target.value,
                        })
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                    />
                    <FontAwesomeIcon
                      className="absolute inset-y-0 right-0 h-full w-[25px] flex items-center px-4 text-gray-600"
                      icon={isPasswordVisible ? faEyeSlash : faEye}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Role
                </label>
                <select
                  value={formState.role_id}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      role_id: e.target.value,
                    })
                  }
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent p-3 outline-none transition focus:border-primary active:border-primary dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue"
                >
                  <option value={roles.ADMIN}>Admin</option>
                  <option value={roles.USER}>User</option>
                </select>
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

export default UserEdit;
