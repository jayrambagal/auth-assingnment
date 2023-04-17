import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register";
import Reset from "./Components/Reset/Reset";
import Dashboard from "./Components/Dashbord/Dashbord";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
