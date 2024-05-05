import React from "react";
import BookSearch from "./components/BookSearch";
import logo from "./assets/logo.png";
import "./App.css";
import jsonData from "./assets/LibraryKeywords.json";

const App = () => {
  return (
    <div className="app-div">
      <div class="header">
        <img src={logo} alt="Logo" />
        <h1>Book Finder</h1>
      </div>

      <div>
        <div>
          <BookSearch data={jsonData} />
        </div>
        {/* Add other content here */}
      </div>
    </div>
  );
};

export default App;
