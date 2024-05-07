/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Auth from "../../API/login/Auth";
import { object, string } from "yup";

let userSchema = object({
  UserName: string().required(),
  UserPassword: string().required(),
  year: string().required(),
});

const LoginPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [details, setDetails] = useState({
    UserName: "",
    UserPassword: "",
    year: "",
  });
  const navigate = useNavigate();
  const authenticateUser = async (e) => {
    e.preventDefault();
    if (
      details.UserName === "" ||
      details.UserPassword === "" ||
      details.year === "" ||
      details.year < 2023
    ) {
      // const user = await userSchema.isValid(details);
      // console.log(user);
      if (details.UserName == "") {
        toast.error("Enter Username");
      }
      if (details.UserPassword === "") {
        toast.error("Enter Password");
      }
      if (details.year === "") {
        toast.error("Select a year");
      } else if (details.year < 2023) {
        toast.error("Use year above 2023");
      }
      setSubmitted(false);
      return;
    } else {
      try {
        const result = await Auth(details);
        if (result.JSONData1.length === 0) {
          toast.error("User not found. Try again");
          setDetails({
            UserName: "",
            UserPassword: "",
            year: "",
          });
        } else {
          toast.success("Login successfull");
          navigate("/dashboard");
          const getUserDeatils = result.JSONData1.map((item) => {
            return {
              EmailID: item.EmailID,
              PhNo: item.PhNo,
              UserLocation: item.UserLocation,
              UserName: item.UserName,
            };
          })[0];
          const rights = result.JSONData1.map((item) => item.RightsDetails);
          localStorage.setItem("user", JSON.stringify(getUserDeatils));
          localStorage.setItem("rights", JSON.stringify(rights));
        }
        setSubmitted(false);
      } catch (error) {
        console.log(error);
        toast.error("error");
        setSubmitted(false);
      }
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-6">
              <div className="mb-10">
                <h3 className="text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4">
                  Sign in to your account and explore a world of possibilities.
                  Your journey begins here.
                </p>
              </div>
              <div>
                <label className="text-sm mb-2 block">User name</label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    value={details.UserName}
                    onChange={(e) =>
                      setDetails({ ...details, UserName: e.target.value })
                    }
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                    placeholder="Enter user name"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    value={details.UserPassword}
                    onChange={(e) =>
                      setDetails({ ...details, UserPassword: e.target.value })
                    }
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <select
                  className="w-1/2 mx-auto rounded-md shadow-sm flex justify-center bg-slate-200 border border-blue-400 py-3 px-4 placeholder-gray-600 focus:outline-none focus:border-slate-500"
                  onChange={(e) =>
                    setDetails({ ...details, year: e.target.value })
                  }
                  value={details.year}
                >
                  <option value="">Select</option>

                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <div className="!mt-10">
                {submitted ? (
                  <>
                    <button
                      type="button"
                      className="w-full shadow-xl py-2.5 px-4 flex justify-center gap-1 items-center text-sm font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none"
                    >
                      <div className="flex items-end gap-1">
                        <div className="flex flex-row items-center gap-2">
                          <div className="wrapperLoader">
                            <div className="circleLoader"></div>
                            <div className="circleLoader"></div>
                            <div className="circleLoader"></div>
                            <div className="shadowLoader"></div>
                            <div className="shadowLoader"></div>
                            <div className="shadowLoader"></div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      onClick={(e) => {
                        setSubmitted(true), authenticateUser(e);
                      }}
                      className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none"
                    >
                      Log in
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-10">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full object-cover"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
