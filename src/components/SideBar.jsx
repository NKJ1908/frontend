import { useState } from "react";
import { Home, LogOut, Menu, Settings, User, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Confirmation from "./Confirmation";

const SideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const StoredUser = localStorage.getItem("user");
  const user = JSON.parse(StoredUser);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState({ title: "", body: "", btn: "" });
  const decon = () => {
    setShowDialog(true);
    setOpen(false);
    setMessage({
      title: "Déconnexion",
      body: "Voulez-vous vous déconnectez ?",
      btn: "Oui, déconnecter",
    });
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menu = [
    {
      label: "Dashboard",
      path: "/DashBoard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "Profil",
      path: "/profil",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "Paramètres",
      path: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full lg:max-w-lg">
      <Confirmation
        open={showDialog}
        setOpen={setShowDialog}
        {...message}
        onClick={logout}
      />
      {!open && (
        <div className="w-full h-fit p-4 flex justify-between items-center bg-gray-300 text-gray-700 lg:hidden border border-blue-800/60">
          <span className="text-2xl font-bold">TaskFlow</span>
          <button className="lg:hidden p-4" onClick={() => setOpen(true)}>
            <Menu className="w-8 h-8" />
          </button>
        </div>
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-2/3 lg:w-full bg-gray-200 text-gray-700 flex flex-col shadow-xl transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-20 flex items-center justify-between px-4 border-b border-blue-800/60">
          <span className="text-2xl font-bold">TaskFlow</span>
          <button
            className="lg:hidden p-2 rounded hover:bg-blue-800/60"
            onClick={() => setOpen(false)}
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="h-20 flex items-center p-4 border-b border-blue-800/60 gap-4">
          <User className="w-10 h-10" />
          <p className="text-gray-700 text-xl flex flex-col justify-center">
            <span>{user?.nom}</span>
            <span>{user?.email}</span>
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive ? "bg-blue-700/60" : "hover:bg-blue-800/60"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition"
            onClick={decon}
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
