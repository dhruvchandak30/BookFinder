import React from "react";
import BookSearch from "./BookSearch";
import { Link } from "react-router-dom";
import jsonData from "../assets/LibraryKeywords.json";
import logo from "../assets/logo.png";
import "../App.css";

const Home = () => {
  return (
    <div className="">
      <div className="header">
        <Link to={"https://lnmiit.ac.in/library/"}>
          <img src={logo} alt="Logo" className="Logo" />
        </Link>
        <h1 className="centralLibrary">Central Libary</h1>
      </div>
      <div>
        <h2 className="Locate">LOCATE YOUR BOOKS</h2>
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

export default Home;
