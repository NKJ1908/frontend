import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import DashBoard from "./pages/DashBoard";
import { Toast } from "radix-ui";
import Settings from "./pages/Settings";
import Profil from "./pages/Profil";

const App = () => {
  return (
    <div className='bg-gray-300 min-h-screen w-full flex justify-center items-center'>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="*" element={<DashBoard/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path="/DashBoard" element={<DashBoard/>}/>
        <Route path="/Settings" element={<Settings/>}/>
        <Route path="/Profil" element={<Profil/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;