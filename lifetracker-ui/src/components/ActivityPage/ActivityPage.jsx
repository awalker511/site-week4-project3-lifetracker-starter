import React from "react";
import "./ActivityPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const ActivityPage = ({ loggedIn, setLoggedIn }) => {
  return (
    <div className="activity-page">
      {localStorage.getItem("token") ? (
        <div className="activity-feed">
          <h2>Activity Feed</h2>
          <div className="activity-buttons">
            <button className="add-fitness-btn">Add Exercise</button>
            <button className="log-sleep-btn">Log Sleep</button>
            <Link to="/nutrition">
              <button className="record-nutrition-btn">Record Nutrition</button>
            </Link>
          </div>
          <div className="row-1">
            <div className="total-exercise">
              <h3>Total Exercise Minutes</h3>
              <h1>0.0</h1>
            </div>

            <div className="total-sleep">
              <h3>Average Hours of Sleep</h3>
              <h1>0.0</h1>
            </div>

            <div className="total-nutrition">
              <h3>Average Daily Calories</h3>
              <h1>0.0</h1>
            </div>
          </div>
        </div>
      ) : (
        <h1>Log in to view your data.</h1>
      )}
    </div>
  );
};

export default ActivityPage;
