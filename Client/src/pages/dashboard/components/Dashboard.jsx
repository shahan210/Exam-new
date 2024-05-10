import Class from "../../../assets/png/teacher.png";
import Subject from "../../../assets/png/books.png";
import Exam from "../../../assets/png/exam.png";
import Users from "../../../assets/png/team.png";
import ExamDefinition from "../../../assets/png/data-analytics_6999245.png";
import Access from "../../../global/components/Access";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const rightsString = localStorage.getItem("rights");

  const auhtorize = (id, route) => {
    const rights = rightsString.split(",").map((str) => str.trim());
    if (rights.includes(id.toString())) {
      navigate(route);
    } else {
      toast.warning("Access Denied");
    }
  };

  return (
    <div className="px-4 py-7 w-4/5 md:w-full mx-auto mb-4 flex-1 bg-gray-50">
      <div className="flex justify-between w-full mx-auto min-h-screen">
        <div className="grid grid-cols-1 w-4/5  md:grid-cols-2 mx-auto lg:grid-cols-4 gap-4 place-items-center md:place-items-start ">
          <div
            onClick={() => auhtorize(1001, "/class_master")}
            className="bg-white transition duration-300 w-36 h-48  xl:w-48 ease-in-out transform hover:scale-105 p-6 rounded-md shadow-md text-center cursor-pointer"
          >
            <div className="mb-4 flex justify-center">
              <img src={Class} alt="class master" className=" w-24" />
            </div>
            <h3 className="xl:text-lg text-md font-semibold mb-2">
              Class Master
            </h3>
          </div>

          <div
            onClick={() => auhtorize(1021, "/subject_master")}
            className="bg-white transition w-36 h-48  xl:w-48 duration-300 ease-in-out transform hover:scale-105 p-6 rounded-md shadow-md text-center cursor-pointer"
          >
            <div className="mb-4 flex justify-center">
              <img src={Subject} alt="subject master" className=" w-24" />
            </div>
            <h3 className="xl:text-lg text-md font-semibold mb-2">
              Subject Master
            </h3>
          </div>

          <div
            onClick={() => auhtorize(1551, "/exam_master")}
            className="bg-white transition duration-300 w-36 h-48  xl:w-48 ease-in-out transform hover:scale-105 p-6 rounded-md shadow-md text-center cursor-pointer"
          >
            <div className="mb-4 flex justify-center">
              <img
                src={ExamDefinition}
                alt="subject master"
                className=" w-24"
              />
            </div>{" "}
            <h3 className="xl:text-lg text-md font-semibold mb-2">
              Exam Master
            </h3>
          </div>
          <div
            onClick={() => auhtorize(1021, "/user_master")}
            className="bg-white transition duration-300 w-36 h-48  xl:w-48 ease-in-out transform hover:scale-105 p-6 rounded-md shadow-md text-center cursor-pointer"
          >
            <div className="mb-4 flex justify-center">
              <img src={Users} alt="subject master" className=" w-24" />
            </div>{" "}
            <h3 className="xl:text-lg text-md font-semibold mb-2">Users</h3>
          </div>
          <div className="">
            <a
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded"
              href="/dashboard/exams"
            >
              Go to Exams
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
