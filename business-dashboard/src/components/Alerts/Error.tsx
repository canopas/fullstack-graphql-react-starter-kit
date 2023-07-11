import { useState } from "react";

interface ModalProps {
  visible: boolean;
  title: string;
  content: string;
}

const ErrorAlert = ({ visible, title, content }: ModalProps) => {
  const [open, setOpen] = useState(visible);

  return (
    <>
      {!open ? (
        ""
      ) : (
        <div className="absolute inset-0 m-auto w-1/2 rounded-sm p-4 md:p-6 xl:p-9 z-[1000]">
          <div className="flex flex-col gap-7.5">
            {/* <!-- Alerts Item --> */}
            <div className="flex w-full border-l-6 border-[#F87171] bg-[#FEE2E2] px-7 py-8 dark:bg-[#1B1B24] md:p-9">
              <div className="w-full">
                <h5 className="mb-3 font-semibold text-[#B45454]">{title}</h5>
                <ul>
                  <li className="leading-relaxed text-[#CD5D5D]">{content}</li>
                </ul>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="hover:bg-red-500 inline-flex w-full justify-center rounded-md bg-[#F87171] px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorAlert;
