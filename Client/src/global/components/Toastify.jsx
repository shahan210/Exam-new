import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (data) =>
  toast.success(
    <div className="popupAlert">
      {data == "delete" && (
        <div>
          {/* <img style={{ width: 20, marginRight: 10 }} /> */}
          Deleted successfully
        </div>
      )}
    </div>
  );

const Toastify = () => {
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default notify;
