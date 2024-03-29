import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphQL/queries.jsx";
import {
  DELETE_USER,
  SET_BUSINESS_DETAILS,
  UPDATE_USER,
} from "../../graphQL/mutations.jsx";
import DefaultLayout from "../../layout/DefaultLayout.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSquareCheck,
  faTrash,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ErrorAlert from "../Alerts/Error.jsx";
import SuccessAlert from "../Alerts/Success.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { render } from "@react-email/render";
import { Email } from "../Email/approval";
import { sendSESMail } from "../../config/utils.js";
import { messages, status } from "../../config/const.js";
import bcrypt from "bcryptjs";
import useLocalStorage from "../../hooks/useLocalStorage.js";

library.add(faEdit, faTrash);

const Users = () => {
  const [loggedUser]: any = useLocalStorage("user", "");
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [destoryUser] = useMutation(DELETE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [setBusinessDetails] = useMutation(SET_BUSINESS_DETAILS);
  const { data, refetch }: any = useQuery(GET_USERS);
  let users: any = data ? data.users : [];

  const handleDelete = (id: number) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUser(id),
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  const deleteUser = (id: number) => {
    destoryUser({
      variables: {
        id: id,
      },
    })
      .then((result) => {
        if (!result.data.deleteUser) {
          setErrorAlert(true);
          setModalTitle("Error");
          setModalContent("Entry not found!! Please try other data.");
        }
        refetch();
      })
      .catch((error: any) => {
        setErrorAlert(true);
        setModalTitle("Error");
        setModalContent(
          "Error deleting item: " + error.message ? error.message : "",
        );
      });
  };

  const sendMail = async (user: any, bStatus: number, businessId: string) => {
    if (
      !user.username ||
      user.username == "" ||
      !user.password ||
      user.password == ""
    ) {
      setErrorAlert(true);
      setModalTitle("Error");
      setModalContent("Please set username and passwords for the user first.");
      return;
    }

    const emailHtml = render(
      <Email
        username={user.username}
        password={user.password}
        mailStatus={bStatus}
        businessId={businessId}
      />,
    );

    try {
      await updateUser({
        variables: {
          id: user.id.toString(),
          data: {
            password: bcrypt.hashSync(
              user.password,
              import.meta.env.VITE_PASSWORD_SALT,
            ),
            business: {
              status: bStatus,
            },
          },
        },
      });

      await setBusinessDetails({
        variables: {
          businessId: user.business.link_id,
        },
      });

      sendSESMail(
        emailHtml,
        "Omnidashboard: Business request status",
        user.email,
      );

      setSuccessAlert(true);
      setModalTitle("Success");
      setModalContent(
        (bStatus == status.APPROVED ? "Approval" : "Rejection") +
          " mail sent successfully",
      );
    } catch (error: any) {
      setErrorAlert(true);
      setModalTitle("Error");
      setModalContent(error.message || messages.ERROR);
    }
  };

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          User requests
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-grayLight dark:bg-darkGrayBlue md:grid-cols-5 ">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="hidden p-2.5 text-center md:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </div>

            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Business name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Status
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>
          {errorAlert ? (
            <ErrorAlert
              visible={errorAlert}
              title={modalTitle}
              content={modalContent}
            />
          ) : (
            ""
          )}
          {successAlert ? (
            <SuccessAlert
              visible={successAlert}
              title={modalTitle}
              content={modalContent}
            />
          ) : (
            ""
          )}
          {users
            ? users.map(function (user: any) {
                return (
                  <div
                    key={user.id}
                    className="grid grid-cols-4 border-b border-stroke dark:border-strokedark md:grid-cols-5"
                  >
                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <p className="text-black dark:text-white">{user.name}</p>
                    </div>

                    <div className="hidden items-center justify-center p-2.5 md:flex xl:p-5">
                      <p className="text-black dark:text-white">{user.email}</p>
                    </div>

                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="text-black dark:text-white">
                        {user.business ? user.business.name : ""}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4 p-2.5 xl:p-5">
                      <FontAwesomeIcon
                        className={` h-7  ${
                          user.business.status == status.APPROVED
                            ? "cursor-not-allowed	text-success"
                            : ""
                        }`}
                        icon={faSquareCheck}
                        onClick={() =>
                          user.business.status !== status.APPROVED
                            ? sendMail(
                                user,
                                status.APPROVED,
                                user.business.link_id,
                              )
                            : ""
                        }
                      />
                      <FontAwesomeIcon
                        className={` h-7 ${
                          user.business.status == status.REJECTED
                            ? "cursor-not-allowed text-danger"
                            : ""
                        }`}
                        icon={faXmarkSquare}
                        onClick={() =>
                          user.business.status !== status.REJECTED
                            ? sendMail(user, status.REJECTED, "")
                            : ""
                        }
                      />
                    </div>

                    {user.id != loggedUser.id ? (
                      <div className="flex items-center justify-center gap-4 p-2.5 xl:p-5">
                        <Link to={"/user/edit/" + user.id}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleDelete(user.id)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Users;
