import React, { useEffect, useState } from "react";
import "./NutritionPage.css";
import NutritionForm from "../NutritionForm/NutritionForm";
import { Link, useNavigate } from "react-router-dom";
import NutritionCard from "../NutritionCard/NutritionCard";
import axios from "axios";

const NutritionPage = ({
  appState,
  setAppState,
  loggedIn,
  setNutritionData,
  nutritionData,
}) => {
  const [createNew, setCreateNew] = useState(false);
  console.log("nut page", appState);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setCreateNew(true);
    navigate("/nutrition/create");
  };
  useEffect(() => {
    const fetchNutritionData = async (user_email) => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        if (localStorage.getItem("token")) {
          headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        }

        const response = await axios.get("http://localhost:3001/nutrition", {
          headers: headers,
        });
        console.log("fetchNutData", response.data);
        // setNutritionData(response.data);
      } catch (error) {
        console.error(error);
      }
      return nutritionData;
    };
    fetchNutritionData(appState.user);
  }, []);

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
          <NutritionCard />
        </div>
      ) : (
        <h1>Log in to view your data.</h1>
      )}
    </div>
  );
};

export default NutritionPage;
