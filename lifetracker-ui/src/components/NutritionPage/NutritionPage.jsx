import React from "react";
import "./NutritionPage.css";
import NutritionForm from "../NutritionForm/NutritionForm";

const NutritionPage = ({ appState, setAppState }) => {
  return (
    <div className="nutrition-page">
      <h1 className="page-title">Nutrition</h1>
      <NutritionForm />
    </div>
  );
};

export default NutritionPage;
