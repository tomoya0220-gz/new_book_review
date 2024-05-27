import { Navigate, Route, Routes } from 'react-router-dom';
import { Signup } from '../pages/Signup';
import { Login } from '../pages/Login';
import { BookReviewList } from '../pages/BookReviewList';
import { useSelector } from 'react-redux';
import { Profile } from '../pages/Profile';

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
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
    </>
  );
};
