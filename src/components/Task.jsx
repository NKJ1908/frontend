import DrodownMenu from "./DrodownMenu";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import axios from "axios";

dayjs.extend(relativeTime);
dayjs.locale("fr");

const customFromNow = (date) => {
  const str = dayjs(date).fromNow();
  return str
    .replace("une minute", "1m")
    .replace("quelques secondes", "1s")
    .replace("secondes", "s")
    .replace(" minutes", "m")
    .replace("une heure", "1h")
    .replace(" heures", "h")
    .replace("un jour", "1j")
    .replace(" jours", "j")
    .replace("un mois", "1mois")
    .replace(" mois", "mois")
    .replace("une année", "1an")
    .replace(" ans", "ans");
};
const Task = ({ id, title, description, date, refresh, status, priority }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const toggleComplete = async () => {
    try {
      const newStatus = status === "complete" ? "pending" : "complete";
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userId: userId,
          },
        }
      );

      refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={`text-gray-500 border border-gray-500/50 flex flex-col p-4 rounded-lg shadow-lg hover:shadow-2xl bg-gray-200 ${
        status === "complete" ? "opacity-80" : ""
      }`}
    >
      <span className="flex justify-between items-center p-2">
        <span className="flex gap-4 items-center">
          <input
            checked={status === "complete"}
            onChange={toggleComplete}
            type="checkbox"
            name=""
            id=""
            className="w-6 h-6 rounded accent-blue-500/60 px-4 cursor-pointer"
          />
          <h1
            className={` text-sm md:text-xl px-4 ${
              status === "complete" ? "line-through text-green-500" : ""
            }`}
          >
            {title.toUpperCase()}
          </h1>
        </span>
        <DrodownMenu TaskId={id} refrech={refresh} task={{_id : id, title, description, priority ,status}}/>
      </span>
      <p className="md:text-lg py-2 px-4">{description}</p>
      <p className="text-md text-gray-600 px-4 py-2">Créé {customFromNow(date)}</p>
    </div>
  );
};

export default Task;
