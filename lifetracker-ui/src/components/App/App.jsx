import "./App.css";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";

function App() {
  return (
    <div>
      <Registration onRegister={onRegister} />
    </div>
  );
}

export default App;
