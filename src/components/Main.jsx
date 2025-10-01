import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Check, CircleOff, RotateCcw, Search } from "lucide-react";
import Task from "./Task";
import axios from "axios";
import Loader from "./Loader";

const Main = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [active, setActive] = useState("Tous");
  const priorite = ["Tous", "Basse", "Moyenne", "Urgente"];
  const Api = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = user.id;
  const searchedTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(searchText.toLowerCase())
  );
  const filter = (p) => {
    if (p === "Tous") {
      setTasks(filteredTasks);
    } else {
      setTasks(filteredTasks.filter((t) => t.priority === p));
    }
  };
  const FetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Api}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userId,
        },
      });
      setTasks(res.data || []);
      setFilteredTasks(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchTodos();
  }, []);

  return (
    <div className="w-full min-h-screen gap-4">
      <Modal open={open} setOpen={setOpen} refrechTasks={FetchTodos} />
      <div className="h-fit w-full bg-gray-200 p-4 flex flex-col lg:flex-row justify-between border-b border-blue-500/60 shadow-lg">
        <div className="flex flex-col p-2 gap-2 justify-center">
          <h1 className="text-2xl font-bold text-gray-700">Tableau de Bord</h1>
          <p className="text-md text-gray-600">
            Bienvenue sur votre espace de travail
          </p>
        </div>
        <button
          className="bg-blue-500/60 rounded-lg px-6 py-3 text-white text-xl font-bold hover:bg-blue-700/80 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          + Nouvelle tâche
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-6 p-6">
        <div className="bg-gray-200 text-gray-500 p-6 rounded-lg border-gray-400/70 flex flex-col shadow-md border hover:shadow-2xl">
          <p className="text-md flex items-center justify-between">
            <span>Tâches terminées</span>
            <Check className="w-8 h-8 text-green-500" />
          </p>
          <span className="text-3xl font-bold">
            {tasks.filter((t) => t.status === "complete").length}
          </span>
        </div>
        <div className="bg-gray-200 text-gray-500 p-6 rounded-lg flex flex-col shadow-md border hover:shadow-2xl border-gray-400/70">
          <p className="text-md flex items-center justify-between">
            <span>Tâches en cours</span>
            <RotateCcw className="w-8 h-8 text-red-500" />
          </p>
          <span className="text-3xl font-bold">
            {tasks.filter((t) => t.status === "pending").length}
          </span>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-700 p-4">
        Mes Tâches ({tasks.length})
      </h1>
      <div className="w-full p-2 flex flex-col lg:flex-row items-center md:flex-row">
        <div className="w-full lg:w-3/4 rounded-xl p-2 relative flex items-center">
          <Search className="w-4 h-4 absolute -translate-y-1/2 left-5 top-1/2" />
          <input
            type="search"
            placeholder="Rechercher une tache..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            name=""
            id=""
            className=" border w-full p-2 outline-0 rounded-2xl pl-10 text-gray-700 text-xl"
          />
        </div>
        <div className="w-full lg:w-1/4 flex gap-2 p-2 items-center justify-center">
          {priorite.map((item, index) => (
            <button
              key={index}
              className={`p-3 text-md font-bold rounded-lg cursor-pointer ${
                active === item
                  ? "bg-blue-700/80 text-white"
                  : "bg-blue-500/60 text-gray-700 hover:bg-blue-700/80"
              }`}
              onClick={() => {
                setActive(item);
                filter(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 w-full gap-4 flex flex-col">
        {loading ? (
          <Loader />
        ) : searchedTasks.length === 0 ? (
          <div className="w-full flex flex-col justify-center font-bold items-center text-2xl text-gray-500 max-h-[500px]">
            <CircleOff className="w-10 h-10" />
            <p>Aucune tâche trouvee</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 max-h-[500px] overflow-y-auto">
            {searchedTasks.map((task) => (
              <Task
                refresh={FetchTodos}
                id={task._id}
                key={task._id}
                title={task.title}
                description={task.description}
                date={task.createdAt}
                status={task.status}
                priority={task.priority}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Main;
