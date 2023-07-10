import { useState } from "react";

interface ModalProps {
  visible: boolean;
  title: string;
  content: string;
}

const SuccessAlert = ({ visible, title, content }: ModalProps) => {
  const [open, setOpen] = useState(visible);

  setTimeout(() => {
    setOpen(false);
  }, 3000);

  return (
    <>
      {!open ? (
        ""
      ) : (
        <div className="absolute inset-0 z-[1000] m-auto w-1/2 rounded-sm p-4 md:p-6 xl:p-9">
          <div className="flex flex-col gap-7.5">
            {/* <!-- Alerts Item --> */}
            <div className="flex w-full border-l-6 border-[#00A36C] bg-[#C1E1C1] px-7 py-8 dark:bg-[#1B1B24] md:p-9">
              <div className="w-full">
                <h5 className="mb-3 font-semibold text-[#355E3B]">{title}</h5>
                <ul>
                  <li className="leading-relaxed text-[#4F7942]">{content}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessAlert;
