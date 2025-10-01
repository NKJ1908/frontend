import { X } from "lucide-react";
import { Dialog, Form } from "radix-ui";
import React, { useState, useEffect } from "react";
import AddTask from "../Midllware/AddTask";
import EditTask from "../Midllware/EditTask";
import { useToast } from "../hooks/ToastContext";

const Modal = ({ open, setOpen, refrechTasks, task }) => {
  const { showToast } = useToast();
  const isEdit = !!task;
  const [title, setTitle] = useState(task?.title || "");
  const [priority, setPriority] = useState(task?.priority || "Basse");
  const [description, setDescription] = useState(task?.description || "");
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Basse");
    }
  }, [task]);
  const submit = async (e) => {
    e.preventDefault();
    const updates = { title, description, priority };
    if (isEdit) {
      try {
        await EditTask({ taskId: task._id, updates });
        showToast({
          body: "La tâche a été modifiée avec succès",
          className: "bg-green-500",
        });
      } catch (error) {
        showToast({
          title: "Erreur",
          body: error.response?.data?.message || "Erreur surevenue",
          className: "bg-red-500",
        });
      }
    } else {
      try {
        await AddTask({ task: updates });
        showToast({
          title: "Succès",
          body:"La tâche a été crée avec succès",
          className: "bg-green-500",
        });
      } catch (error) {
        showToast({
          title: "Erreur",
          body: error.response?.data?.message || "Erreur surevenue",
          className: "bg-red-500",
        });
      }
    }
    setOpen(false);
    refrechTasks();
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/80 flex items-center justify-center" />
        <Dialog.Content className="rounded-lg shadow-lg fixed top-[30%] left-1/2 -translate-x-1/2 bg-black/60 w-full md:w-[500px] p-4 h-fit mx-auto">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setOpen(false),
                  setTitle(""),
                  setDescription(""),
                  setPriority("Basse");
              }}
              className="w-10 h-10 text-red-500 hover:bg-red-500 hover:text-white flex justify-center items-center rounded-lg"
            >
              <X />
            </button>
          </div>
          <Dialog.Title className="font-bold text-2xl text-center text-white">
            {isEdit ? "Modification de tache" : "Ajout de tache"}
          </Dialog.Title>
          <Dialog.Description>""</Dialog.Description>
          <Form.Root onSubmit={submit} className="gap-4 flex flex-col">
            <Form.Field className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Form.Label className="text-xl font-bold text-white">
                  Titre
                </Form.Label>
                <Form.Message
                  match={"valueMissing"}
                  className="text-sm text-red-500"
                >
                  Ce champ est requis
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Tapez le titre de votre tache ici"
                  className="w-full rounded-lg p-2 border border-gray-400 text-white"
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="flex flex-col gap-2">
              <Form.Label className="text-xl font-bold text-white">
                Description
              </Form.Label>
              <Form.Control asChild>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg p-2 border border-gray-400 text-white"
                  placeholder="Description de votre tache"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="flex flex-col gap-2">
              <label className="text-xl font-bold text-white">Priorité</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border p-2 rounded-md text-white flex"
              >
                <option value="Basse" className="text-gray-500">
                  Basse
                </option>
                <option value="Moyenne" className="text-gray-500">
                  Moyenne
                </option>
                <option value="Urgente" className="text-gray-500">
                  Urgente
                </option>
              </select>
            </Form.Field>
            <Form.Submit asChild>
              <button
                type="submit"
                className="bg-blue-500 p-4 mt-5 font-bold text-white text-center w-full rounded-lg hover:bg-blue-800 text-xl cursor-pointer"
              >
                {isEdit ? "Modifier" : "Ajouter"}
              </button>
            </Form.Submit>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
