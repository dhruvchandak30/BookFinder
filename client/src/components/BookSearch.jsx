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
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [bookNotFound, setBookNotFound] = useState(false);

  // Group data by keywords
  const groupedData = data.reduce((acc, item) => {
    if (item.Keyword) {
      const keyword = item.Keyword.toLowerCase();
      if (!acc[keyword]) {
        acc[keyword] = [];
      }
      acc[keyword].push(item);
    }
    return acc;
  }, {});

  // Filter the grouped keywords by the search term
  const filteredKeywords = Object.keys(groupedData).filter((keyword) =>
    keyword.includes(searchTerm.toLowerCase())
  );

  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);
    setSearchTerm("");
    setBookNotFound(false);
    updateCounter();
    onClick();
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
  );
};

export default BookSearch;
