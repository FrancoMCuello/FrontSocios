import "./App.css";
import Home from "./components/home/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* const apiURL = "https://localhost:3000"; */

function App() {
  return (
    <div className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
