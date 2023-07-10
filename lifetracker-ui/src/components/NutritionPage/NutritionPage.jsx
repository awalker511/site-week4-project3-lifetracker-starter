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
  //fetching user nutrition data from database
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

        setAppState({
          ...appState,
          nutrition: response.data.nutritions,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchNutritionData(appState.user.user_email);
  }, []);

  return (
    <div className="nutrition-page">
      {localStorage.getItem("token") ? (
        <div>
          <h1 className="page-title">Nutrition</h1>
          <button className="new-nutrition-button" onClick={handleButtonClick}>
            Record Nutrition
          </button>
          {appState.nutrition?.map((foodItem, key) => {
            return <NutritionCard {...foodItem} key={foodItem.id} />;
          })}
        </div>
      ) : (
        <h1>Log in to view your data.</h1>
      )}
    </div>
  );
};

export default NutritionPage;
