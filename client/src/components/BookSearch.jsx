import React, { useState } from "react";

const BookSearch = ({ data }) => {
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
  };

  const clearSelection = () => {
    setSelectedItem(null);
    setSearchTerm("");
    setBookNotFound(false);
  };

  const onChangeHandler = (e) => {
    const term = e.target.value.trim();
    setSearchTerm(term);
    setSelectedItem(null);

    // Check if filteredData is empty
    if (term !== "" && filteredData.length === 0) {
      setBookNotFound(true);
    } else {
      setBookNotFound(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
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
      {searchTerm && (
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
        <div style={{ marginTop: "10px", padding: "10px" }}>
          <p style={{ margin: 0 }}>
            Go to Row {selectedItem.Address.match(/\d+/g)[0]}, Side{" "}
            {selectedItem.Address.match(/[A-Z]/i)}, Shelf No. {selectedItem.Shelf}, Class No. {selectedItem.Class}
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
      )}
      {bookNotFound && (
        <p style={{ color: "red", marginTop: "10px", fontStyle: "italic" }}>Book Not Found</p>
      )}
    </div>
  );
};

export default BookSearch;
