import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphQL/queries.jsx";
import { DELETE_CATEGORY } from "../../graphQL/mutations.jsx";
import DefaultLayout from "../../layout/DefaultLayout.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ErrorAlert from "../Alerts/Error.jsx";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategories } from "../../store/categories.js";

library.add(faEdit, faTrash);

const Categories = () => {
  const dispatch = useDispatch();
  const [errorAlert, setErrorAlert] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [destoryCategory] = useMutation(DELETE_CATEGORY);
  const { data, refetch }: any = useQuery(GET_CATEGORIES, {
    variables: {
      businessId: localStorage.getItem("businessId"),
    },
  });

  const { state } = useLocation();
  if (state) {
    const { prevAction } = state ? state : null; // Read values passed on state
    if (prevAction == "create") {
      refetch();
    }
  }

  let categories: any = data ? data.categories : [];
  dispatch(setCategories(categories));

  const handleDelete = (id: number) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteCategory(id),
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

  const deleteCategory = (id: number) => {
    destoryCategory({
      variables: {
        id: id,
      },
    })
      .then((result) => {
        if (!result.data.deleteCategory) {
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

  const mainCategoryName = (parentId: number): string => {
    let parentCat = categories.filter((cat: any) => cat.id == parentId)[0];
    return parentCat?.name || "None";
  };

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6  inline-flex items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Categories
          </h4>

          <Link
            to={"/categories/create"}
            className="rounded-full w-12 h-12 bg-darkGrayBlue ml-[20px] flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="text-white" />
          </Link>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-grayLight dark:bg-darkGrayBlue">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Subcategory Of
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
          {categories
            ? categories.map(function (category: any) {
                return (
                  <div
                    key={category.id}
                    className="grid grid-cols-3 border-b border-stroke dark:border-strokedark"
                  >
                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <p className="text-black dark:text-white">
                        {category.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <p className="text-black dark:text-white">
                        {mainCategoryName(category.parent_id)}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-4 p-2.5 xl:p-5">
                      <Link to={"/categories/edit/" + category.id}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleDelete(category.id)}
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

export default Categories;
