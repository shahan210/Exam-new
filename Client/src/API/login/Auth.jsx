import { toast } from "react-toastify";
import api from "../../API/post";

const Auth = async (data) => {
  const UserDetails = {
    UserName: data.UserName,
    UserPassword: btoa(data.UserPassword + "password"),
  };
  // console.log(UserDetails);

  let userData = [];
  try {
    const result = await api.post("/auth", UserDetails);
    if (result) {
      let token = localStorage.setItem("token", result[0]?.access);
      localStorage.setItem("access", "access");
      userData = result[0];
      return userData;
    }
  } catch (error) {
    console.log(error);
    toast.error("error");
  }
};

export default Auth;
