import React from "react";
import BookSearch from "./components/BookSearch";

import "./App.css";


import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from "./components/Home";

const App = () => {


  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
      </div>
      
  );
};

export default App;
