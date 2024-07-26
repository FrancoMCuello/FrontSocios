import "./App.css";
import NewRegister from "./components/NewRegister";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
