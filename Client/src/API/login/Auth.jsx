import { toast } from "react-toastify";
import api from "../../API/post";

const Auth = async (data) => {
  const UserDetails = {
    UserName: data.UserName,
    UserPassword: btoa(data.UserPassword + "password"),
  };
  // console.log(hashedPassword);

  let userData = [];
  try {
    const result = await api.post("/auth", UserDetails);
    // console.log(result[0]);
    userData = result[0];
    return userData;
  } catch (error) {
    console.log(error);
    toast.error("error");
  }
};

export default Auth;
