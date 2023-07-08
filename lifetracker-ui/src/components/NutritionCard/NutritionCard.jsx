import React from "react";

const NutritionCard = ({ calories, quantity, name, category, image_url }) => {
  return (
    <div className="nutrition-card">
      <div className="card">
        <div className="food-image">
          <img src={image_url} />
        </div>
        <div className="food-name">{name}</div>
        <div className="food-category">{category}</div>
        <div className="food-calories">{calories}</div>
        <div className="food-quantity">{quantity}</div>
      </div>
    </div>
  );
};

export default NutritionCard;
