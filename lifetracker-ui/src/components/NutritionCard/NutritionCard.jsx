import React from "react";

const NutritionCard = ({ nutritionData, setNutritionData }) => {
  //   const fetchNutritionData = async (user_id) => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/nutrition");

  //       setNutritionData(response.data);
  //       console.log("NUTRITIONDATA", response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     return nutritionData;
  //   };

  return (
    <div className="nutrition-card">
      <div className="card">
        <div className="food-image">
          {/* <img src={nutritionData.image_url} /> */}
        </div>
        {/* <div className="food-calories">{nutritionData.calories}</div> */}
        {/* <div className="food-quantity">{nutritionData.quantity}</div> */}
      </div>
    </div>
  );
};

export default NutritionCard;
