import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DeleteBookForm = () => {
  const [bookId, setBookId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [bookNotFound, setBookNotFound] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://bookfinder-1.onrender.com/fetch_books"
        );
        setBooks(response.data);
        console.log("Fetch Books");
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Group data by keywords
  const groupedData = books.reduce((acc, item) => {
    if (item.Keyword) {
      const keyword = item.Keyword.toLowerCase();
      if (!acc[keyword]) {
        acc[keyword] = [];
      }
      acc[keyword].push(item);
    }
    return acc;
  }, {});

  const filteredKeywords = Object.keys(groupedData).filter((keyword) =>
    keyword.includes(searchTerm.toLowerCase())
  );

  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);
    setSearchTerm("");
    setBookNotFound(false);
  };

  const clearSelection = () => {
    setSelectedKeyword(null);
    setSearchTerm("");
    setBookNotFound(false);
  };

  const onChangeHandler = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setSelectedKeyword(null);

    if (filteredKeywords.length === 0) {
      setBookNotFound(true);
    } else {
      setBookNotFound(false);
    }
  };

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
      const response = await axios.post(
        "https://bookfinder-1.onrender.com/deletebook",
        {
          data: { bookId, secretKey },
        }
      );

      setMessage(response.data.message);
      setBookId("");
      setSecretKey("");
    } catch (error) {
      if (error.response) {

        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        setError(error.response.data.error || "An error occurred");
      } else if (error.request) {
        console.error("Request data:", error.request);
        setError("No response received from server");
      } else {
        console.error("Error message:", error.message);
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Delete Subject/Keyword
        </h2>
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
        <div className="text-center flex flex-col gap-4">
          <Link
            to="/"
            className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
          >
            Go Back to Home
          </Link>
          <Link
            to="/adminPage"
            className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
          >
            Go Back to Admin Panel
          </Link>
        </div>
      </div>
      <div
        className="BookSearchDiv"
        style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
      >
        <input
          type="text"
          placeholder="Enter your Keyword/Subject"
          value={searchTerm}
          onChange={onChangeHandler}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "30rem",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "2px solid black",
          }}
        />
        {searchTerm && (
          <ul
            className="home-card"
            style={{ listStyleType: "none", padding: 0 }}
          >
            {filteredKeywords.map((keyword) => (
              <li key={keyword} onClick={() => handleKeywordClick(keyword)}>
                {keyword}
              </li>
            ))}
          </ul>
        )}

        {selectedKeyword && (
          <div className="search-card">
            <div>
              <div className="flex flex-row justify-between align-middle my-2">
                <h2 className="text-2xl font-bold ">{selectedKeyword}</h2>
              </div>
              {groupedData[selectedKeyword].map((item) => (
                <div key={item._id} style={{ marginBottom: "10px" }}>
                  <h5>Id: {item.SrNo}</h5>
                  <p className="text-[15px]" style={{ margin: 0 }}>
                    Go to {item.BayGuide}, Shelf No. {item.Shelf}, Class No.{" "}
                    {item.Class}
                  </p>
                </div>
              ))}
              <button
                style={{
                  padding: "8px",
                  marginTop: "10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={clearSelection}
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
        {bookNotFound && (
          <p style={{ color: "red", marginTop: "10px", fontStyle: "italic" }}>
            Book Not Found
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteBookForm;
