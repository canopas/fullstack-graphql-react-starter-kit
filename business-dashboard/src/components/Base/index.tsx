import { useQuery } from "@apollo/client";
import { GET_BUSINESS_USERS } from "../../graphQL/queries";

const BaseIndex = () => {
  const { loading, data }: any = useQuery(GET_BUSINESS_USERS, {
    variables: {
      businessId: localStorage.getItem("businessId"),
    },
  });

  return (
    <>
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
        </div>
        {data && data.businessUsers.length > 0
          ? data.businessUsers.map(function (user: any) {
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
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default BaseIndex;
