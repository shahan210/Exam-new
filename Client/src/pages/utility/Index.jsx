import { toast } from "react-toastify";
import getStudentImport from "../../API/users/getStudentImport";
import Layout from "../../global/components/Layout";

const Index = () => {
  const importStudents = async () => {
    try {
      const result = await getStudentImport();
      if (result[0].insertId == undefined) {
        return toast.error("Something went wrong");
      }
      toast.success("Import data successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="md:p-2 w-full">
        <div>
          <h1 className="text-xl">Utility Master</h1>
        </div>
        <div className="shadow-sm shadow-slate-400 w-full rounded p-2 ">
          <div className="flex items-center gap-2">
            <button
              onClick={() => importStudents()}
              className="p-2 text-center bg-blue-900 text-white rounded w-fit  hover:scale-105 transition-all ease-in-out duration-100"
            >
              Import Student Data
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
