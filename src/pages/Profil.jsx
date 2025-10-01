import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";

const Profil = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    // Exemple: récupérer user du localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return <p className="text-center text-gray-600">Chargement...</p>;
  }

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mon Profil</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
        <button className=" p-2 bg-blue-500/60 rounded-lg" onClick={() => navigate("/DashBoard")}>
          Retour
        </button>
        <div className="flex items-center gap-6">
          <img
            src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
            alt="Avatar"
            className="w-20 h-20 rounded-full shadow-md"
          />
          <div>
            <h2 className="text-xl font-bold">{user.nom}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">25</p>
            <p className="text-gray-600">Tâches créées</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">12</p>
            <p className="text-gray-600">Tâches terminées</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600">
            Modifier
          </button>
          <button className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600">
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profil;
