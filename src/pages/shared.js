import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function Shared() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">

      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-800 text-white p-4 fixed top-0 left-0 z-50 
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:w-64`}
      >
        <h2 className="text-xl font-bold mb-6">Admin</h2>
        <ul className="space-y-4">
          <Link to="/" onClick={() => setOpen(false)}>
            <li className="hover:bg-gray-700 p-2 rounded">Dashboard</li>
          </Link>
          <Link to="/calendar" onClick={() => setOpen(false)}>
            <li className="hover:bg-gray-700 p-2 rounded">Calendar</li>
          </Link>
          <Link to="/stats" onClick={() => setOpen(false)}>
            <li className="hover:bg-gray-700 p-2 rounded">Movies</li>
          </Link>
          <Link to="/kanban" onClick={() => setOpen(false)}>
            <li className="hover:bg-gray-700 p-2 rounded">Kanban</li>
          </Link>
          <Link to="/tasks" onClick={() => setOpen(false)}>
            <li className="hover:bg-gray-700 p-2 rounded">Stats</li>
          </Link>
        </ul>
      </div>

      {/* Right side */}
      <div className="flex-1 md:ml-64">

        {/* Topbar */}
        <div className="h-16 bg-white shadow flex items-center px-4 justify-between">

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <h1 className="text-lg font-semibold">Good evening</h1>
        </div>

        {/* Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
