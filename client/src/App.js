import React from "react";
import BookSearch from "./components/BookSearch";
import logo from "./assets/logo.png";
import jsonData from "./assets/LibraryKeywords.json";

const App = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "", height: "70px", marginRight: "auto" }}
        />
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>Book Finder</h1>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "0px", height: "100px", marginLeft: "auto" }}
        />
      </div>

      <div style={{ textAlign: "left" }}>
        <div style={{ marginBottom: "20px" }}>
          <BookSearch data={jsonData} />
        </div>
        {/* Add other content here */}
      </div>
    </div>
  );
};

export default App;
