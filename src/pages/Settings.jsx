import React, { useState } from "react";
import { useToast } from "../hooks/ToastContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("fr");
  const [notif, setNotif] = useState(true);
  const {showToast} = useToast()
const navigate = useNavigate()
  const handleSave = () => {
    navigate("/DasshBoard")
    showToast({
          body:"Parametres mofifiees avec succes",
          className: "bg-green-500",
        })
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Paramètres</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6">
        <button className=" p-2 bg-blue-500/60 rounded-lg" onClick={() => navigate("/DashBoard")}>
          Retour
        </button>
        <div>
          <label className="font-bold text-gray-700">Thème</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full mt-2 p-2 border rounded-lg"
          >
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-gray-700">Langue</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full mt-2 p-2 border rounded-lg"
          >
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notif}
            onChange={() => setNotif(!notif)}
            className="w-5 h-5"
          />
          <label className="text-gray-700">Activer les notifications</label>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-500 px-6 py-3 rounded-lg text-white font-bold hover:bg-blue-600"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default Settings;
