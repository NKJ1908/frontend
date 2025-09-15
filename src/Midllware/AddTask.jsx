import React from "react";
import axios from "axios";
const AddTask = async ({ task }) => {
  const Api = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  try {
    await axios.post(`${Api}/tasks`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        userId: userId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default AddTask;
