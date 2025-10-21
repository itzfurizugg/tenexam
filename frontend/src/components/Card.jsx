import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-60 h-32">
      {children}
    </div>
  );
};

export default Card;
