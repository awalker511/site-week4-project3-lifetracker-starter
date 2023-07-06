import React from "react";
import "./RegistrationPage.css";
import Registration from "../Registration/Registration";
import ActivityPage from "../ActivityPage/ActivityPage";

const RegistrationPage = ({ setAppState, appState }) => {
  return (
    <div className="registration-page">
      {/* <ActivityPage /> */}
      <Registration setAppState={setAppState} appState={appState} />
    </div>
  );
};

export default RegistrationPage;
