import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from "./pages/dashboard/Navbar";
import Sidebar from "./pages/dashboard/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
}

export default App;
