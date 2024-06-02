import React, { useState } from "react";
import "../App.css";

const updateCounter = async () => {
  try {
    const response = await fetch(
      "https://bookfinder-1.onrender.com/update-counter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const BookSearch = ({ data, onClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookNotFound, setBookNotFound] = useState(false);

  const filteredData = data.filter((item) =>
    item.Keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSearchTerm("");
    setBookNotFound(false);
    updateCounter();
    onClick();
  };

  const clearSelection = () => {
    setSelectedItem(null);
    setSearchTerm("");
    setBookNotFound(false);
  };

  const onChangeHandler = (e) => {
    const term = e.target.value;  // Removed trimming
    setSearchTerm(term);
    setSelectedItem(null);

    if (filteredData.length === 0) {
      setBookNotFound(true);
    } else {
      setBookNotFound(false);
    }
  };

  return (
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
        <ul className="home-card" style={{ listStyleType: "none", padding: 0 }}>
          {filteredData.map((item) => (
            <li key={item.Id} onClick={() => handleItemClick(item)}>
              {item.Keyword}
            </li>
          ))}
        </ul>
      )}

      {selectedItem && (
        <div className="search-card">
          <div>
            <div className="flex flex-row justify-between align-middle my-2">
              <h2 className="text-xl font-bold ">{selectedItem.Keyword}</h2>
              <h5>Id: {selectedItem.Id}</h5>
            </div>
            <p style={{ margin: 0 }}>
              Go to {selectedItem.Address}, Shelf No. {selectedItem.Shelf},
              Class No. {selectedItem.Class}
            </p>
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
  );
};

export default BookSearch;
