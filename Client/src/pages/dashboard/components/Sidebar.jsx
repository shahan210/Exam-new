import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const rightsString = localStorage.getItem("rights");
  const navigate = useNavigate();

  const clearAll = () => {
    const clearToken = localStorage.removeItem("token");
    const clearUser = localStorage.removeItem("user");
    const clearRights = localStorage.removeItem("rights");
    const clearAccess = localStorage.removeItem("access");
    const clearrestriction = localStorage.removeItem("restrictedAccessSubject");
    const clearRestrictedAccess = localStorage.removeItem("restrictedAccess");
  };
  const auhtorize = (id, route) => {
    const rights = rightsString.split(",").map((str) => str.trim());
    if (rights.includes(id.toString())) {
      navigate(route);
    } else {
      toast.warning("Access Denied");
    }
  };
  return (
    <aside className="min-h-full md:w-72 max-h-screen h-[100vh] fixed p-6 border-r hidden md:block bg-gray-800 text-white">
      <ul className="space-y-2 mt-[30px]">
        <li>
          <a href="/dashboard">
            <button className="menu--button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-layout-dashboard mr-2 h-4 w-4"
              >
                <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                <rect width="7" height="5" x="3" y="16" rx="1"></rect>
              </svg>
              Dashboard
            </button>
          </a>
        </li>
        <li>
          <button
            onClick={() => auhtorize(1001, "/class_master")}
            className="menu--button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-check mr-2 h-4 w-4"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              <path d="m9 9.5 2 2 4-4"></path>
            </svg>
            Class Master
          </button>
        </li>
        <li>
          <button
            onClick={() => auhtorize(1021, "/subject_master")}
            className="menu--button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users mr-2 h-4 w-4"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Subject Master
          </button>
        </li>
        <li>
          <button
            onClick={() => auhtorize(1551, "/exam_master")}
            className="menu--button"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-open-check mr-2 h-4 w-4"
            >
              <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z"></path>
              <path d="m16 12 2 2 4-4"></path>
              <path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3"></path>
            </svg>
            Exam Master
          </button>
        </li>
        <li>
          <button
            onClick={() => auhtorize(1021, "/user_master")}
            className="menu--button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-open-check mr-2 h-4 w-4"
            >
              <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z"></path>
              <path d="m16 12 2 2 4-4"></path>
              <path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3"></path>
            </svg>{" "}
            Users
          </button>
        </li>
        <li>
          <a onClick={() => clearAll()} href="/">
            <button className="menu--button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out mr-2 h-4 w-4"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
              Logout
            </button>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
