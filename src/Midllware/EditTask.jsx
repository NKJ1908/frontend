import axios from "axios";
const EditTask = async ({taskId,updates}) => {
  const Api = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  try {
    await axios.patch(
      `${Api}/tasks/${taskId}`,
        {...updates},{
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userId,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export default EditTask;
