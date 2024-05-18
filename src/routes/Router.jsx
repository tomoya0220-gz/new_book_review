import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Routes>
          <Route path="/signup" element={</>}></Route>
          <Route path="/login" element={</>}></Route>
        </Routes>
      </Routes>
    </BrowserRouter>
  );
};