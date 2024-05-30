import React, { useState } from "react";
import axios from "axios";

const DeleteBookForm = () => {
  const [bookId, setBookId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "bookId") {
      setBookId(value);
    } else if (name === "secretKey") {
      setSecretKey(value);
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    // Check if bookId or secretKey is empty
    if (!bookId || !secretKey) {
      setError("Please enter both book ID and secret key");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/deletebook", {
        data: { bookId, secretKey }
      });
      setMessage(response.data.message);
      setBookId("");
      setSecretKey("");
    } catch (error) {
      setMessage("");
      setError("Failed to delete book");
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Delete Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Book ID:</label>
          <input
            type="number"
            name="bookId"
            value={bookId}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border-gray-700 border-2 p-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Secret Key:</label>
          <input
            type="password"
            name="secretKey"
            value={secretKey}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border-gray-700 border-2 p-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 block mx-auto"
        >
          Delete Book
        </button>
      </form>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </div>
  );
};

export default DeleteBookForm;
