// components/SensorCard.js
import React from "react";

const waveSvg = (color) => (
  <svg
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    className="absolute bottom-0 w-full h-16"
  >
    <path
      fill={color}
      fillOpacity="0.4"
      d="M0,224L48,197.3C96,171,192,117,288,101.3C384,85,480,107,576,128C672,149,768,171,864,181.3C960,192,1056,192,1152,186.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>
);

export default function SensorCard({ label, level, color }) {
  const levelPercent = Math.min(Math.max(level, 0), 100);

  return (
    <div
      className="relative rounded-xl shadow-lg p-4 w-48 mx-2 flex flex-col items-center"
      style={{ backgroundColor: "#f0f9ff" }}
    >
      <h3 className="font-bold text-lg mb-2" style={{ color }}>
        {label}
      </h3>

      <div
        className="relative w-24 h-48 rounded-b-xl overflow-hidden"
        style={{ border: `3px solid ${color}` }}
      >
        {/* Eau animée */}
        <div
          className="absolute bottom-0 left-0 w-full transition-[height] duration-1500 ease-in-out"
          style={{ height: `${levelPercent}%`, backgroundColor: color }}
        >
          {waveSvg(color)}
        </div>

        {/* Niveau en % */}
        <div className="absolute top-3 left-0 w-full text-center font-semibold text-white text-xl drop-shadow-md select-none">
          {levelPercent}%
        </div>
      </div>
    </div>
  );
}
