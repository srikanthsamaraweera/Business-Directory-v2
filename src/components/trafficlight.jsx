import React from "react";

const TrafficLight = ({ status }) => {
  // Determine active light based on the status prop
  const isGreen = status === "YES";
  const isYellow = status === "PENDING";
  const isRed = status === "NO";

  return (
    <div className="flex  items-center space-x-2">
      {/* Red Light */}
      <div
        className={`w-3 h-3 rounded-full ${
          isRed ? "bg-red-500" : "bg-red-100 "
        }`}
      ></div>

      {/* Yellow Light */}
      <div
        className={`w-3 h-3 rounded-full ${
          isYellow ? "bg-yellow-500" : "bg-yellow-100"
        }`}
      ></div>

      {/* Green Light */}
      <div
        className={`w-3 h-3 rounded-full ${
          isGreen ? "bg-green-500" : "bg-green-100"
        }`}
      ></div>
    </div>
  );
};

export default TrafficLight;
