import { Routes,Route } from "react-router-dom";
import Confirmation from "./components/Confirmation";
import Modal from "./components/Modal";
import Toasty from "./components/Toasty";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import DashBoard from "./pages/DashBoard";
import SideBar from "./components/SideBar";
import { Toast } from "radix-ui";

const App = () => {
  return (
    <Toast.Provider swipeDirection="right">
    <div className='bg-gray-300 min-h-screen w-full flex justify-center items-center'>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="*" element={<DashBoard/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path="/DashBoard" element={<DashBoard/>}/>
        </Route>
      </Routes>
    </div>
    <Toast.Viewport className='right-5 bottom-5 fixed flex flex-col w-[300px] max-w-full gap-2.5 outline-0 z-50'/>
    </Toast.Provider>
  );
};

export default App;