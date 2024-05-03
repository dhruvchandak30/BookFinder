import React, { useState } from "react";

const BookSearch = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showKeywords, setShowKeywords] = useState(true);
  const [bookNotFound, setBookNotFound] = useState(false);

  const filteredData = data.filter((item) =>
    item.Keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowKeywords(false);
    setBookNotFound(false);
  };

  const clearSelection = () => {
    setSelectedItem(null);
    setShowKeywords(true);
    setBookNotFound(false);
  };

  // Handle search
  const handleSearch = () => {
    if (filteredData.length === 0 && searchTerm.trim() !== "") {
      setBookNotFound(true);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setBookNotFound(false);
    handleSearch();
  };

  return (
    <div style={{padding:"20px"}}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={onChangeHandler}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "100%",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      {searchTerm && showKeywords && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {filteredData.map((item) => (
            <li
              key={item.Id}
              style={{
                cursor: "pointer",
                padding: "8px",
                marginBottom: "5px",
                borderRadius: "5px",
                backgroundColor: "#f0f0f0",
              }}
              onClick={() => handleItemClick(item)}
            >
              {item.Keyword}
            </li>
          ))}
        </ul>
      )}
      {selectedItem && (
        <div style={{ border: "2px solid black", padding: "10px" }}>
          <p><strong>Shelf:</strong> {selectedItem.Shelf}</p>
          <p><strong>Keyword:</strong> {selectedItem.Keyword}</p>
          <p><strong>Class:</strong> {selectedItem.Class}</p>
          <p><strong>Address:</strong> {selectedItem.Address}</p>
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
      )}
      {bookNotFound && (
        <p style={{ color: "red", marginTop: "10px" }}>Book Not Found</p>
      )}
    </div>
  );
};

export default BookSearch;
