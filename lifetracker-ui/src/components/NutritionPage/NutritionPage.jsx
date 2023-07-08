import React, { useEffect, useState } from "react";
import "./NutritionPage.css";
import NutritionForm from "../NutritionForm/NutritionForm";
import { Link, useNavigate } from "react-router-dom";

const NutritionPage = ({ appState, setAppState, loggedIn }) => {
  const [createNew, setCreateNew] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setCreateNew(true);
    navigate("/nutrition/create");
  };

  // const res= await axios.get("http://localhost:3001/nutrition", {

  // })

  return (
    <div className="nutrition-page">
      {localStorage.getItem("token") ? (
        <div>
          <h1 className="page-title">Nutrition</h1>
          {/* <Link to="/nutrition/create"> */}
          <button className="new-nutrition-button" onClick={handleButtonClick}>
            Record Nutrition
          </button>
          {createNew && <NutritionForm />}
          {/* </Link> */}
        </div>
      ) : (
        <h1>Log in to view your data.</h1>
      )}
    </div>
  );
};

export default NutritionPage;
