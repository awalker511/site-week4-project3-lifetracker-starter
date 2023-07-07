import React, { useState } from "react";
import "./NutritionForm.css";

const NutritionForm = ({ setAppState }) => {
  const [errors, setErrors] = useState({});
  const [nutritionForm, setNutritionForm] = useState({
    foodname: "",
    category: "",
    quantity: "",
    calories: "",
    pictureUrl: "",
  });
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!e.target.name) {
      setErrors((e) => ({ ...e, nutritionForm: "Field is empty" }));
    }
    try {
      const res = await axios.post(
        "http://localhost:3001/nutrition/nutrition",
        {
          foodname: nutritionForm.foodname,
          category: nutritionForm.category,
          quantity: nutritionForm.quantity,
          calories: nutritionForm.calories,
          pictureUrl: nutritionForm.pictureUrl,
        }
      );
      if (res) {
        setAppState(res.data);
      }
    } catch (error) {
      console.error(error);
    }
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
        <select name="category">
          <option>Select a category</option>
          <option>Snack</option>
          <option>Beverage</option>
          <option>Food</option>
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
              min={0}
              max={5000}
              step={10}
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
        <button className="save-button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default NutritionForm;
