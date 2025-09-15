import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Trash, Edit2, Ellipsis } from "lucide-react";
import Confirmation from "./Confirmation";
import { useState } from "react";
import Modal from "./Modal";
import Delete from "../Midllware/Delete";
import EditTask from "../Midllware/EditTask";

const DrodownMenu = ({ TaskId, refrech, task }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ title: "", body: "", btn: "" });
  const [showModal, setShowModal] = useState(false);
  const edit = async () => {
    setShowModal(true);
  };
  const supp = () => {
    setOpen(true);
    setMessage({
      title: "Suppression",
      body: "Voulez-vous vous supprimer cette tache ?",
      btn: "Oui, supprimer",
    });
  };
  return (
    <DropdownMenu.Root>
      <Confirmation
        open={open}
        setOpen={setOpen}
        {...message}
        onClick={async () => {
          await Delete(TaskId);
          refrech();
        }}
      />
      <Modal
        open={showModal}
        setOpen={setShowModal}
        refrechTasks={refrech}
        task={task}
      />
      <DropdownMenu.Trigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-300 outline-0">
          <Ellipsis className="w-6 h-6 text-gray-700 cursor-pointer" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-[150px] bg-white p-2 rounded-lg shadow-lg"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="w-full px-2 py-1 text-md text-gray-700 hover:bg-blue-300 hover:text-white rounded-md cursor-pointer outline-0 flex gap-2"
            onClick={edit}
          >
            <Edit2 />
            Éditer
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="w-full px-2 py-1 text-md text-gray-700 hover:bg-red-300 hover:text-white rounded-md cursor-pointer outline-0 flex gap-2"
            onClick={supp}
          >
            <Trash />
            Supprimer
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DrodownMenu;
