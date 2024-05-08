import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GlobalProvider } from "./global/GlobalContext";
import ClassMaster from "./pages/class master/ClassMaster";
import Home from "./pages/dashboard/Home";
import SubjectMaster from "./pages/subject master/SubjectMaster";
import LoginPage from "./pages/login";
import UserMaster from "./pages/users/UserMaster";
import ExamMaster from "./pages/examMaster";
import UserMasterEdit from "./pages/users/components/UserMasterEdit";
import AddNewQuestionMaster from "./pages/examMaster/Quiz/addNew";
import EditQuestion from "./pages/examMaster/Quiz/editQuestion";
import EditQuestionMaster from "./pages/examMaster/components/editQuestionMaster";
function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/class_master" element={<ClassMaster />} />
            <Route path="/exam_master" element={<ExamMaster />} />
            <Route path="/subject_master" element={<SubjectMaster />} />
            <Route path="/exam_master/add-new" element={<AddNewQuestionMaster />} />
            <Route path="/exam_master/edit-new" element={<EditQuestion />} />
            <Route path="/exam_master/edit-quiz" element={<EditQuestionMaster />} />
            <Route path="/user_master" element={<UserMaster />} />
            <Route path="/user_master/edit-user" element={<UserMasterEdit />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
