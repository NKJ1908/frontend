import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Form } from "radix-ui";
import Toasty from "../components/Toasty";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [visibleP, setVisibleP] = useState(false);
  const [visibleC, setVisibleC] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nom, setNom] = useState("");
  const navigate = useNavigate()
  const Api = import.meta.env.VITE_API_URL
      const [message, setMessage] = useState({title:"",body:"",className:""})
      const [open, setOpen] = useState(false)
  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
    setMessage({
      title: "Erreur",
      body: "Les mots de passe ne correspondent pas",
      className: "bg-red-500"
    });
    setOpen(true);
    return;
  }
    const user = {nom,email,password}
    try {
        const res= await axios.post(`${Api}/auth/register`,user)
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))
        localStorage.setItem("Message", JSON.stringify({
            title: "Succes",
            body: "Inscription reussie",
            className: "bg-green-500"
        }))
        navigate("/DashBoard")
        setOpen(true)
    } catch (error) {
        console.error(error);
        setMessage({
            title: "Erreur",
            body: error.response?.data?.message || " Une erreur est survenue",
            className: "bg-red-500"
        })
        setOpen(true)
    }
  };
  return (
    <Form.Root
      onSubmit={submit}
      className="lg:max-w-lg   gap-4 flex flex-col p-4 w-full shadow-2xl rounded-lg m-4 bg-white"
    >
        <Toasty open={open} setOpen={setOpen} {...message}/>
      <div className="p-4 w-20 rounded-lg h-20 bg-blue-500/60 text-3xl text-white font-bold mx-auto flex items-center justify-center">
        TF
      </div>
      <h1 className="text-2xl font-bold text-gray-600 text-center">TaskFLow</h1>
      <p className="text-lg text-gray-700 text-center ">
        Gerer vos taches efficacement et plus simplement
      </p>
      <h1 className="text-2xl font-bold text-gray-500 text-center">
        Inscrivez-vous
      </h1>
      <p className="text-lg text-gray-700 text-center ">
        Rejoignez nous pour commencer
      </p>
      <Form.Field className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <Form.Label className="text-xl font-bold text-gray-700">Nom complet</Form.Label>
          <Form.Message match={"valueMissing"} className="text-sm text-red-500">
            Ce champ est requis
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Votre nom ici"
            className="w-full rounded-lg p-4 border bg-transparent border-gray-400 text-gray-600 outline-0 focus:border-blue-500/70"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <Form.Label className="text-xl font-bold text-gray-700">
            Addresse Email
          </Form.Label>
          <Form.Message match={"valueMissing"} className="text-sm text-red-500">
            Ce champ est requis
          </Form.Message>
          <Form.Message match={"typeMismatch"} className="text-sm text-red-500">
            Email invalide
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Votre email ici"
            className="w-full rounded-lg p-4 border bg-transparent border-gray-400 text-gray-600 outline-0 focus:border-blue-400"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <Form.Label className="text-xl font-bold text-gray-700">
            Mot de passe
          </Form.Label>
          <Form.Message match={"valueMissing"} className="text-sm text-red-500">
            Ce champ est requis
          </Form.Message>
          <Form.Message match={"tooShort"} className="text-sm text-red-500">
            Mot de passe trop court
          </Form.Message>
        </div>
          <div className="w-full relative">
            <Form.Control asChild>

            <input
              type={visibleP ? "text" : "password"}
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe ici"
              className="w-full rounded-lg p-4 border border-gray-400 text-gray-600 bg-transparent outline-0 focus:border-blue-500/60"
            />
            </Form.Control>
            <button
              type="button"
              aria-label={
                visibleP
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
              className="top-1/2 right-3 -translate-y-1/2 absolute text-gray-600"
              onClick={() => setVisibleP(!visibleP)}
            >
              {visibleP ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeClosed className="w-4 h-4" />
              )}
            </button>
          </div>
      </Form.Field>
      <Form.Field className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <Form.Label className="text-xl font-bold text-gray-700">
            Confirmation
          </Form.Label>
          <Form.Message match={"valueMissing"} className="text-sm text-red-500">
            Ce champ est requis
          </Form.Message>
          {confirm && confirm !== password && (
            <Form.Message className="text-sm text-red-500">
              Les mots de passes ne sont pas conformes
            </Form.Message>
          )}
        </div>
        <Form.Control asChild>
          <div className="w-full relative">
            <input
              type={visibleC ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirme votre mot de passe"
              className="w-full rounded-lg p-4 border border-gray-400 text-gray-600 bg-transparent outline-0 focus:border-blue-500/60"
              required
            />
            <button
              type="button"
              aria-label={
                visibleC
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
              className="top-1/2 right-3 -translate-y-1/2 absolute text-gray-600"
              onClick={() => setVisibleC(!visibleC)}
            >
              {visibleC ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeClosed className="w-4 h-4" />
              )}
            </button>
          </div>
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button
          type="submit"
          className="bg-blue-500/60 p-4 mt-5 font-bold text-white text-center w-full rounded-lg hover:bg-blue-800/60 text-xl cursor-pointer"
        >
          S'inscrire
        </button>
      </Form.Submit>
      <p className="text-gray-500 text-center text-md mt-4">
        Deja un compte ? {""}
        <a href="/Login" className="text-blue-500/60 hover:underline">
          Connectez-vous
        </a>
      </p>
    </Form.Root>
  );
};

export default Register;
