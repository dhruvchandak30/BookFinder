import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome to the Dashboard!
        </h2>
        <div className="space-y-4">
          <div className="text-center">
            <Link
              to="/add_library_book"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
            >
              Add Subject/Keyword
            </Link>
          </div>
          <div className="text-center">
            <Link
              to="/delete_library_book"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
            >
              Delete Subject/Keyword
            </Link>
          </div>
          <div className="text-center">
            <Link
              to="/add_notification"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
            >
              Add Notification
            </Link>
          </div>
          <div className="text-center">
            <Link
              to="/"
              className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
            >
              Go Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://bookfinder-1.onrender.com/loginuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      if (data.success) {
        setMessage("Login successful!");
        setIsLoggedIn(true);
      } else {
        setMessage("Invalid credentials");
      }
    } else {
      setMessage("Error logging in");
    }
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default AdminPage;
