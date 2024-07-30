import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewRegister from "./components/NewRegister";

/* const apiURL = "https://localhost:3000"; */

function App() {
  return (
    <div className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newRegister" element={<NewRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
