import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Form } from "radix-ui";
import Toasty from "../components/Toasty";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../hooks/ToastContext";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {showToast} = useToast()
  const Api = import.meta.env.VITE_API_URL;
  const submit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const res = await axios.post(`${Api}/auth/login`, user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      showToast({
          body: "Connexion réussie",
          className: "bg-green-500",
      })
      navigate("/DashBoard");
    } catch (error) {
      showToast({
          title: "Erreur",
          body: error.response?.data?.message || "Erreur surevenue",
          className: "bg-red-500",
        });
    }
  };
  return (
    <Form.Root
      onSubmit={submit}
      className="lg:max-w-lg gap-4 flex flex-col p-4 w-full  shadow-2xl rounded-lg m-4 bg-white"
    >
      <div className="p-4 w-20 rounded-lg h-20 bg-blue-500/60 text-3xl text-white font-bold mx-auto flex items-center justify-center">
        TF
      </div>
      <h1 className="text-2xl font-bold text-gray-700 text-center">TaskFLow</h1>
      <p className="text-lg text-gray-600 text-center ">
        Gerer vos taches efficacement et plus simplement
      </p>
      <h1 className="text-2xl font-bold text-gray-700 text-center">
        Connexion
      </h1>
      <p className="text-lg text-gray-600 text-center ">
        Connectez-vous a votre espace de travail
      </p>
      <Form.Field className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <Form.Label className="text-xl font-bold text-gray-700">
            Addresse email
          </Form.Label>
          <Form.Message match={"valueMissing"} className="text-sm text-red-500">
            Ce champ est requis
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email ici"
            className="w-full rounded-lg p-4 border bg-transparent border-gray-400 text-gray-600 outline-0 focus:border-blue-500/60"
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
        </div>
        <div className="w-full relative">
          <Form.Control asChild>
            <input
              type={visible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe ici"
              className="w-full rounded-lg p-4 border border-gray-400 text-gray-600 bg-transparent outline-0 focus:border-blue-500/60"
              required
            />
          </Form.Control>
          <button
            type="button"
            aria-label={
              visible ? "Masquer le mot de passe" : "Afficher le mot de passe"
            }
            className="top-1/2 right-3 -translate-y-1/2 absolute text-gray-600"
            onClick={() => setVisible(!visible)}
          >
            {visible ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeClosed className="w-4 h-4" />
            )}
          </button>
        </div>
      </Form.Field>
      <div className="flex justify-between items-center w-full text-md">
        <label
          htmlFor="2"
          className="flex items-center gap-2 text-gray-600 cursor-pointer"
        >
          <input
            id="2"
            type="checkbox"
            className="w-4 h-4 rounded accent-blue-500/60"
          />
          Se souvenir de moi
        </label>
        <a href="#" className="text-blue-500 hover:underline">
          {" "}
          Mot de passe oublie
        </a>
      </div>
      <Form.Submit asChild>
        <button
          type="submit"
          className="bg-blue-500/60 p-4 mt-5 font-bold text-white text-center w-full rounded-lg hover:bg-blue-800 text-xl cursor-pointer"
        >
          Se connecter
        </button>
      </Form.Submit>
      <p className="text-gray-500 text-center text-md mt-4">
        Pas de compte ? {""}
        <a href="/Register" className="text-blue-400 hover:underline">
          Inscrivez-vous
        </a>
      </p>
    </Form.Root>
  );
};

export default Login;
