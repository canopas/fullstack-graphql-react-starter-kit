import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTRATION } from "../../graphQL/mutations";
import bcrypt from "bcryptjs";
import ErrorAlert from "../../components/Alerts/Error";
import { messages } from "../../config/const";
import { validEmail } from "../../config/utils";
import Business from "../../assets/images/user/business.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const user = {
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const [formState, setFormState] = useState(user);
  const [emailError, setEmailError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const [createAdmin] = useMutation(REGISTRATION);
  const navigate = useNavigate();

  const register = async (e: any) => {
    e.preventDefault();
    if (emailError !== "") {
      return;
    }
    try {
      if (formState.password !== formState.password_confirm) {
        setModalVisible(true);
        setModalTitle("Validation Failed");
        setModalContent("Passwords doesn't match! Try again.");
      }

      let data = await createAdmin({
        variables: {
          data: {
            name: formState.name,
            email: formState.email,
            password: bcrypt.hashSync(
              formState.password,
              import.meta.env.VITE_PASSWORD_SALT
            ),
          },
        },
      });
      localStorage.setItem("user", JSON.stringify(data.data.createAdmin));
      navigate("/");
    } catch (error: any) {
      setModalVisible(true);
      setModalTitle("Error");
      setModalContent(error.message || messages.ERROR);
    }
    setFormState(user);
  };

  return (
    <div className="flex h-[100vh] justify-center">
      <div className="container m-auto">
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
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="px-26 py-17.5 text-center">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Omnidashboard admin
                </h2>
                <span className="mt-15 inline-block">
                  <img src={Business} alt="business" />
                </span>
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Sign Up
                </h2>
                <form
                  onSubmit={(e) => {
                    register(e);
                  }}
                >
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            name: e.target.value,
                          })
                        }
                        required
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        onBlur={() =>
                          setEmailError(
                            !validEmail(formState.email)
                              ? "Please enter valid email"
                              : ""
                          )
                        }
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            email: e.target.value,
                          })
                        }
                        required
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            password: e.target.value,
                          })
                        }
                        required
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Re-type Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Re-enter your password"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            password_confirm: e.target.value,
                          })
                        }
                        required
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Create account"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <p>
                      Already have an account?{" "}
                      <Link to="/" className="text-primary">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
