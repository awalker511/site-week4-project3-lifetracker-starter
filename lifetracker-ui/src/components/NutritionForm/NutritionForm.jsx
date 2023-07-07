import React, { useState } from "react";
import "./NutritionForm.css";

const NutritionForm = ({}) => {
  const [errors, setErrors] = useState({});
  const [nutritionForm, setNutritionForm] = useState({
    foodname: "",
    category: "",
    quantity: "",
    calories: "",
    pictureUrl: "",
  });
  const postNutritionForm = (e) => {};

  const handleNutritionChange = (e) => {
    if (!e.target.name) {
      setErrors((e) => ({ ...e, nutritionForm: "Field is empty" }));
    }
    setNutritionForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="nutrition-form">
      <h1>Record Nutrition</h1>
      <form onSubmit={postNutritionForm}>
        <input
          type="text"
          name="foodname"
          value={nutritionForm.foodname}
          placeholder="Food name"
          onChange={handleNutritionChange}
        ></input>
        <br></br>

        <label>Category</label>
        <select name="category">
          <option>Select a category</option>
          <option>Snack</option>
          <option>Beverage</option>
          <option>Food</option>
        </select>
        <br></br>

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          min={0}
          max={100}
          onChange={handleNutritionChange}
        ></input>
        <label>Calories</label>
        <input
          type="number"
          name="calories"
          min={0}
          max={5000}
          step={10}
        ></input>
        <br></br>

        <input
          type="text"
          name="pictureUrl"
          value={nutritionForm.pictureUrl}
          placeholder="url for picture"
          onChange={handleNutritionChange}
        ></input>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NutritionForm;
