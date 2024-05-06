import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { GlobalProvider } from "./global/GlobalContext";
import ClassMaster from "./pages/class master/ClassMaster";
import Home from "./pages/dashboard/Home";
import SubjectMaster from "./pages/subject master/SubjectMaster";
function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/class_master" element={<ClassMaster />} />
            <Route path="/subject_master" element={<SubjectMaster />} />
            {/* <Route path="/subject_master" element={<SubjectMaster />} /> */}
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
