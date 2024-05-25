import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Signup } from '../pages/Signup';
import { Login } from '../pages/Login';
import { BookReviewList } from '../pages/BookReviewList';
import { useSelector } from 'react-redux';

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {auth ? (
          <>
            <Route path="/public/books" element={<BookReviewList />}  />
            <Route path="/" element={<Navigate to="/public/books" replace />}  />
            <Route path="*" element={<Navigate to="/public/books" replace />}  />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" replace />}  />
            <Route path="*" element={<Navigate to="/login" replace />}  />
          </>
        )
        }
      </Routes>
    </BrowserRouter>
  );
};
