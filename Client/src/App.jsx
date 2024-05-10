import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GlobalProvider } from "./global/GlobalContext";
import ClassMaster from "./pages/class master/ClassMaster";
import Home from "./pages/dashboard/Home";
import SubjectMaster from "./pages/subject master/SubjectMaster";
import LoginPage from "./pages/login";
import UserMaster from "./pages/users/UserMaster";
import ExamMaster from "./pages/examMaster";
import UserMasterEdit from "./pages/users/UserMasterEdit";
import AddNewQuestionMaster from "./pages/examMaster/Quiz/AddNewQuestionMaster";
import EditExamDetails from "./pages/examMaster/Quiz/editQuestion";
import EditQuestionMaster from "./pages/examMaster/components/editQuestionMaster";
import PrivateRoute from "./global/components/Access";
function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/class_master" element={<ClassMaster />} />
              <Route path="/subject_master" element={<SubjectMaster />} />
              <Route path="/user_master" element={<UserMaster />} />
              <Route
                path="/user_master/edit-user"
                element={<UserMasterEdit />}
              />
              <Route
                path="/user_master/create-user"
                element={<UserMasterEdit />}
              />
              {/* unais routes */}
              <Route path="/exam_master" element={<ExamMaster />} />
              <Route
                path="/exam_master/add-new-ques"
                element={<AddNewQuestionMaster />}
              />
              <Route
                path="/exam_master/edit-exam-info"
                element={<EditExamDetails />}
              />
              <Route
                path="/exam_master/edit-quiz-info"
                element={<EditQuestionMaster />}
              />
              {/* unais routes */}
            </Route>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}
export default App;
