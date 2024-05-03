import "./App.css";
import ClassMaster from "./pages/class master/ClassMaster";
import Home from "./pages/dashboard/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubjectMaster from "./pages/subject master/SubjectMaster";
import Navbar from "./pages/dashboard/components/Navbar";
import Sidebar from "./pages/dashboard/components/Sidebar";
import { GlobalProvider } from "./global/GlobalContext";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/class_master" element={<ClassMaster />} />
            <Route path="/subject_master" element={<SubjectMaster />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
