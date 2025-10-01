import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[300px]">
      <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-blue-600"></div>
    </div>
  );
};

export default Loader;
