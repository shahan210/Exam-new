import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GlobalProvider } from "./global/GlobalContext";
import ClassMaster from "./pages/class master/ClassMaster";
import Home from "./pages/dashboard/Home";
import SubjectMaster from "./pages/subject master/SubjectMaster";
import LoginPage from "./pages/login";
function App() {
    return (
        <>
            <GlobalProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" index element={<Home />} />
                        <Route path="/class_master" element={<ClassMaster />} />
                        <Route path="/login_master" element={<LoginPage />} />
                        <Route path="/subject_master" element={<SubjectMaster />} />
                        {/* <Route path="/subject_master" element={<SubjectMaster />} /> */}
                    </Routes>
                </BrowserRouter>
            </GlobalProvider>
        </>
    );
}

export default App;
