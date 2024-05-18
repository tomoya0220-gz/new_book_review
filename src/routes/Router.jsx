import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/login";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};