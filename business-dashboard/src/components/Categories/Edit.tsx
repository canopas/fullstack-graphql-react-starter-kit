import { useMutation } from "@apollo/client";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumb";
import { messages } from "./../../config/const";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UPDATE_CATEGORY } from "../../graphQL/mutations";
import ErrorAlert from "../Alerts/Error";
import { useSelector } from "react-redux";

const CategoryEdit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [formState, setFormState] = useState({
    id: 0,
    name: "",
    parent_id: 0,
  });

  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  let data = useSelector((state: any) => state.category.categories);

  const categories = data.filter(
    (category: any) =>
      (!category.parent_id || category.parent_id == 0) && category.id != id,
  );

  useEffect(() => {
    if (data) {
      const category = data.filter((category: any) => category.id == id);

      setFormState({
        id: category[0].id,
        name: category[0].name,
        parent_id: category[0].parent_id,
      });
    }
  }, [data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateCategory({
        variables: {
          id: id,
          data: {
            name: formState.name,
            parent_id: formState.parent_id,
            business_id: localStorage.getItem("businessId"),
          },
        },
      });
      navigate("/categories");
    } catch (error: any) {
      setModalVisible(true);
      setModalTitle("Error");
      setModalContent(error.message || messages.ERROR);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="CategoryEdit" />
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
          <h3 className="font-medium text-black dark:text-white">
            Edit Category
          </h3>
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="p-6.5">
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
              {categories.length > 0 ? (
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    SubCategory of
                  </label>
                  <select
                    value={formState.parent_id}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        parent_id: parseInt(e.target.value),
                      })
                    }
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent p-3 outline-none transition focus:border-primary active:border-primary dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue"
                  >
                    <option value={0}>None</option>
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                ""
              )}
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

export default CategoryEdit;
