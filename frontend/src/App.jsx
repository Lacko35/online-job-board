import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path='/sign-up' element={<Register />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}