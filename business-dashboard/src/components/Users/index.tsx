import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphQL/queries.jsx";
import { DELETE_USER } from "../../graphQL/mutations.jsx";
import DefaultLayout from "../../layout/DefaultLayout.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ErrorAlert from "../Alerts/Error.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

library.add(faEdit, faTrash);

const Users = () => {
  const [errorAlert, setErrorAlert] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [destoryUser] = useMutation(DELETE_USER);
  const { data, refetch }: any = useQuery(GET_USERS, {
    variables: {
      businessId: localStorage.getItem("businessId"),
    },
  });

  let users: any = data ? data.businessUsers : [];

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
    return;
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

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6  inline-flex items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Users
          </h4>

          <Link
            to={"/user/create"}
            className="rounded-full w-12 h-12 bg-darkGrayBlue ml-[20px] flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="text-white" />
          </Link>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-grayLight dark:bg-darkGrayBlue">
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
            <div className="hidden p-2.5 text-center md:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Username
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
          {users
            ? users.map(function (user: any) {
                return (
                  <div
                    key={user.id}
                    className="grid grid-cols-4 border-b border-stroke dark:border-strokedark"
                  >
                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <p className="text-black dark:text-white">{user.name}</p>
                    </div>

                    <div className="hidden items-center justify-center p-2.5 md:flex xl:p-5">
                      <p className="text-black dark:text-white">{user.email}</p>
                    </div>

                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="text-black dark:text-white">
                        {user.username}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-4 p-2.5 xl:p-5">
                      <Link to={"/user/edit/" + user.id}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleDelete(user.id)}
                      />
                    </div>
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
