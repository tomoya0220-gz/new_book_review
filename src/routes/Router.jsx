import { Route, Routes } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";

export const Router = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};