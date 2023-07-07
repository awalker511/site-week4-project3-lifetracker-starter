import React from "react";
import "./ActivityPage.css";
import { useState } from "react";

const ActivityPage = ({ loggedIn }) => {
  return (
    <div className="activity-page">
      {loggedIn ? (
        <div className="activity-feed"></div>
      ) : (
        <h1>Log in to see your data.</h1>
      )}
    </div>
  );
};

export default ActivityPage;
