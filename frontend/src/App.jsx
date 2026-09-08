import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        <Route path='/create-acc' element={<Register />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}