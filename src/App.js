import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewRegister from "./components/NewRegister";
import Register from "./components/Register";
import ViewVehiculo from "./components/ViewVehiculo";
import ViewUser from "./components/ViewUser";

/* const apiURL = "https://localhost:3000"; */

function App() {
  return (
    <div className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newRegister" element={<NewRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path="/viewVehiculo" element={<ViewVehiculo />} />
          <Route path="/viewUser" element={<ViewUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
