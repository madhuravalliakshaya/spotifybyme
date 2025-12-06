import React from "react";

const cards = [
  { title: "Tickets", value: 90, color: "bg-blue-400" },
  { title: "Users", value: 1200, color: "bg-green-400" },
  { title: "Revenue", value: "$15,000", color: "bg-red-400" },
  { title: "Movies", value: 25, color: "bg-yellow-400" },
];

export default function SquareCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} w-full h-40 rounded-lg flex flex-col items-center justify-center text-white shadow-lg`}
        >
          <h2 className="text-xl font-semibold">{card.title}</h2>
          <p className="text-3xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
