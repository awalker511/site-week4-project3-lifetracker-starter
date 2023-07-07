import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="heading-container">
        <div className="title-stack">
          <div className="app-title">
            <h1>LifeTracker</h1>
            <h2 className="subtitle">Take back control of your life.</h2>
          </div>

          <div className="heading-img">
            <img
              src="https://images.pexels.com/photos/267391/pexels-photo-267391.jpeg?cs=srgb&dl=pexels-pixabay-267391.jpg&fm=jpg"
              alt=""
            ></img>
          </div>
        </div>
      </div>
      <div className="option-tiles">
        <div className="tile-card">
          <h3 className="card-title">Fitness</h3>
          <a href="/fitness">
            <img src="https://static.standard.co.uk/2022/09/20/10/Fitness.jpg?width=968&auto=webp&quality=50&crop=968%3A645%2Csmart"></img>
          </a>
        </div>

        <div className="tile-card">
          <h3 className="card-title">Food</h3>
          <img src="https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg"></img>
        </div>

        <div className="tile-card">
          <h3 className="card-title">Rest</h3>
          <img src="https://i.insider.com/613160419ef1e50018f996fe?width=1200&format=jpeg"></img>
        </div>

        <div className="tile-card">
          <h3 className="card-title">Planner</h3>
          <img src="https://www.artnews.com/wp-content/uploads/2020/07/AdobeStock_104746276.jpeg"></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
