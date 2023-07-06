import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphQL/mutations";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/Alerts/Error";
import bcrypt from "bcryptjs";
import { messages } from "../../config/const";
import { validEmail } from "../../config/utils";
import Business from "../../assets/images/user/business.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const user = {
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(user);
  const [emailError, setEmailError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();

  const signIn = async (e: any) => {
    e.preventDefault();
    if (emailError !== "") {
      return;
    }

    try {
      let data: any = await login({
        variables: {
          data: {
            email: formState.email,
            password: bcrypt.hashSync(
              formState.password,
              import.meta.env.VITE_PASSWORD_SALT,
            ),
          },
        },
      });
      if (data.data.adminLogin.email == "") {
        setModalVisible(true);
        setModalTitle("Error");
        setModalContent("Invalid credentials!! Please try again.");
      } else {
        localStorage.setItem("user", JSON.stringify(data.data.adminLogin));
        navigate("/");
      }
    } catch (error: any) {
      setModalVisible(true);
      setModalTitle("Error");
      setModalContent(error.message || messages.ERROR);
    }
    setFormState(user);
  };

  return (
    <div className="flex h-[100vh] justify-center">
      <div className="container m-auto ">
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
              <div className="px-26 py-10.5 text-center">
                <h2 className="mb-9  text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Omnidashboard admin
                </h2>
                <span className="mt-15 inline-block">
                  <img src={Business} alt="business" />
                </span>
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-14.5">
                <h2 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Sign In
                </h2>

                <form
                  onSubmit={(e) => {
                    signIn(e);
                  }}
                >
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
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
                      />

                      <span className="absolute right-4 top-4">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="6+ Characters, 1 Capital letter"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-desaturatedBlue dark:bg-darkDesaturatedBlue dark:focus:border-primary"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            password: e.target.value,
                          })
                        }
                      />

                      <span className="absolute right-4 top-4">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Sign In"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <p>
                      Don’t have any account?{" "}
                      <Link to="/signup" className="text-primary">
                        Sign Up
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

export default SignIn;
