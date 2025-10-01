// ToastContext.jsx
import React, { createContext, useContext, useState } from "react";
import Toasty from "../components/Toasty";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    title: "",
    body: "",
    className: "",
  });

  const showToast = ({ body, className }) => {
    setToast({ open: true,  body, className });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toasty
        open={toast.open}
        setOpen={ hideToast}
        body={toast.body}
        className={toast.className}
      />
    </ToastContext.Provider>
  );
};
