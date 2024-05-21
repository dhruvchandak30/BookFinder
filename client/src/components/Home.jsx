import React, { useState, useEffect } from "react";
import BookSearch from "./BookSearch";
import { Link } from "react-router-dom";
import jsonData from "../assets/LibraryKeywords.json";
import logo from "../assets/logo.png";
import "../App.css";

const Home = () => {
  const [counterValue, setCounterValue] = useState(0);

  const fetchCounterValue = async () => {
    try {
      const response = await fetch("https://bookfinder-1.onrender.com/get-counter", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCounterValue(data.value);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCounterValue();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="">
      <div className="header">
        <Link to={"https://lnmiit.ac.in/library/"}>
          <img src={logo} alt="Logo" className="Logo" />
        </Link>
      </div>
      <div>
        <h1 className="centralLibrary">Central Library</h1>
      </div>
      <div>
        <h2 className="Locate">LOCATE YOUR BOOKS</h2>
      </div>

      <div>
        <div>
          <BookSearch data={jsonData} onClick={fetchCounterValue} />
        </div>
        {counterValue > 0 && (
          <div>
            <h3 className="counterLabel">
              This book finder has been used {counterValue} times.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
