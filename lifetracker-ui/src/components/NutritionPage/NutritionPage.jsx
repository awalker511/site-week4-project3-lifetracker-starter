import React, { useState } from "react";
import "./NutritionPage.css";
import NutritionForm from "../NutritionForm/NutritionForm";
import { Link, useNavigate } from "react-router-dom";
const NutritionPage = ({ appState, setAppState, loggedIn }) => {
  const [createNew, setCreateNew] = useState(false);
  const handleButtonClick = () => {
    setCreateNew(true);
  };
  return (
    <div className="nutrition-page">
      <h1 className="page-title">Nutrition</h1>
      <Link to="/nutrition/create">
        <button className="new-nutrition-button" onClick={handleButtonClick}>
          Record Nutrition
        </button>
        {createNew && <NutritionForm />}
      </Link>
    </div>
  );
};

export default NutritionPage;
