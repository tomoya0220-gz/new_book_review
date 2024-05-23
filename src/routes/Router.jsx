import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from '../pages/Signup';
import { Login } from '../pages/Login';
import { BookReviewList } from '../pages/BookReviewList';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<BookReviewList />} />
      </Routes>
    </BrowserRouter>
  );
};