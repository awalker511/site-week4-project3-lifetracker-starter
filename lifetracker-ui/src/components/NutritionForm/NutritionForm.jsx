import React from "react";
import "./NutritionForm.css";

const NutritionForm = ({}) => {
  const handleNutritionForm = (e) => {};

  const handleNutritionChange = (e) => {};
  return (
    <div className="nutrition-form">
      <h1>Record Nutrition</h1>
      <form onSubmit={handleNutritionForm}>
        <input
          type="text"
          name="foodName"
          value={foodName}
          placeholder="Food name"
          //onChange={e}
        ></input>
        <br></br>

        <label>Category</label>
        <select name="category" placeholder="Select a category">
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
          //onChange={e}
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
          placeholder="url for picture"
        ></input>
      </form>
    </div>
  );
};

export default NutritionForm;
