import React, { useState, useEffect } from "react";
import BookSearch from "./BookSearch";
import { Link, useNavigate } from "react-router-dom";
import jsonData from "../assets/LibraryKeywords.json";
import logo from "../assets/logo.png";
import "../App.css";

const Home = ({ books }) => {
  const [counterValue, setCounterValue] = useState(0);

  const fetchCounterValue = async () => {
    try {
      const response = await fetch(
        "https://bookfinder-1.onrender.com/get-counter",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
  }, []);

  const navigate = useNavigate();
  const AdminPageHandler = () => {
    navigate("/adminPage");
  };
  const NotifPageHandler = () => {
    navigate("/show_notification");
  };

  return (
    <div className="">
      <div className="">
        <div className="flex flex-row justify-between p-8">
          <div className="">
            <Link to={"https://lnmiit.ac.in/library/"}>
              <img src={logo} alt="Logo" className="Logo" />
            </Link>
          </div>
          <div
            onClick={AdminPageHandler}
            className="cursor-pointer bg-blue-700 text-center align-middle p-3  rounded-lg text-xl text-white"
          >
            Admin
          </div>
          <div
            onClick={NotifPageHandler}
            className="cursor-pointer bg-blue-700 text-center align-middle p-3  rounded-lg text-xl text-white"
          >
            Recent Updates
          </div>
        </div>
        <div className=" text-center m-2 gap-5 flex flex-col">
          <div className="text-black font-bold text-6xl">Central Library</div>
          <div className="text-black font-bold text-4xl">LOCATE YOUR BOOKS</div>
        </div>
      </div>

      <div className="BookResultDiv">
        <div>
          <BookSearch data={books} onClick={fetchCounterValue} />
        </div>
        {counterValue > 0 && (
          <div className="m-4 font-bold text-xl">
            This book finder has been used {counterValue} times.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
