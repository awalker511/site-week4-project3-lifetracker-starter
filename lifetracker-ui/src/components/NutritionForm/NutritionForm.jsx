import React, { useState } from "react";
import "./NutritionForm.css";
import axios from "axios";
import NutritionPage from "../NutritionPage/NutritionPage";
import { Route, Link } from "react-router-dom";

const NutritionForm = ({ setAppState, appState }) => {
  const [errors, setErrors] = useState({});
  const [nutritionForm, setNutritionForm] = useState({
    foodname: "",
    category: "",
    quantity: "1",
    calories: "",
    pictureUrl: "",
  });
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("IN HANDLE SUBMIT");

    // if (!e.target.name) {
    //   setErrors((e) => ({ ...e, nutritionForm: "Field is empty" }));
    // }

    const headers = {
      "Content-Type": "application/json",
    };
    if (localStorage.getItem("token")) {
      headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    }
    const res = await axios.post(
      "http://localhost:3001/nutrition/create",
      {
        foodname: nutritionForm.foodname,
        category: nutritionForm.category,
        quantity: nutritionForm.quantity,
        calories: nutritionForm.calories,
        pictureUrl: nutritionForm.pictureUrl,
        // user_id: 1,
      },
      {
        headers: headers,
      }
    );

    //setAppState({ ...appState, user: "user.id", nutrition: { nutritions } });
    setNutritionForm({
      foodname: "",
      category: "",
      quantity: "1",
      calories: "",
      pictureUrl: "",
    });
  };

  const handleNutritionChange = (e) => {
    setNutritionForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="nutrition">
      <h1 className="page-title">Nutrition</h1>
      <br></br>
      <form className="nutrition-form" onSubmit={handleOnSubmit}>
        <input
          className="nutrition-input"
          type="text"
          name="foodname"
          value={nutritionForm.foodname}
          placeholder="Name"
          onChange={handleNutritionChange}
        ></input>
        <br></br>

        <label>Category</label>
        <br></br>
        <select
          name="category"
          onChange={handleNutritionChange}
          value={nutritionForm.category}
        >
          <option>Select a category</option>
          <option value="snack">Snack</option>
          <option value="beverage">Beverage</option>
          <option value="food">Food</option>
        </select>
        <br></br>

        <div className="number-input">
          <div className="input-container">
            <label>Quantity</label>
            <br></br>
            <input
              className="nutrition-input"
              type="number"
              name="quantity"
              value={nutritionForm.quantity}
              min={0}
              max={100}
              onChange={handleNutritionChange}
            ></input>
          </div>
          <br></br>
          <div className="input-container">
            <label>Calories</label>
            <br></br>
            <input
              className="nutrition-input"
              type="number"
              name="calories"
              value={nutritionForm.calories}
              min={0}
              max={5000}
              step={10}
              onChange={handleNutritionChange}
            ></input>
          </div>
          <br></br>
        </div>

        <br></br>
        <input
          className="nutrition-input"
          type="text"
          name="pictureUrl"
          value={nutritionForm.pictureUrl}
          placeholder="url for picture"
          onChange={handleNutritionChange}
        ></input>
        <br></br>
        <br></br>
        {/* <Link to="/nutrition"> */}
        <button className="save-button" type="submit">
          Save
        </button>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default NutritionForm;
