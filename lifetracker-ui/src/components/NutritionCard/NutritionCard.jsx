import React from "react";

const NutritionCard = ({}) => {
  return (
    <div className="nutrition-card">
      <div className="card">
        <div className="food-image">
          <img src={nutritions.pictureUrl} />
        </div>
        <div className="food-calories">{nutritions.calories}</div>
        <div className="food-quantity">{nutritions.quantity}</div>
      </div>
    </div>
  );
};

export default NutritionCard;
