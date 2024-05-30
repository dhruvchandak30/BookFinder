import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import axios from "axios";
import AddBookForm from "./components/AddBook";
import DeleteBookForm from "./components/DeleteBook";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fetch_books");
        setBooks(response.data);
        console.log("Fetch Books");
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home books={books} />} />
          <Route path="add_library_book" element={<AddBookForm />} />
          <Route path="delete_library_book" element={<DeleteBookForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
