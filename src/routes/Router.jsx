import { Navigate, Route, Routes } from 'react-router-dom';
import { Signup } from '../pages/Signup';
import { Login } from '../pages/Login';
import { BookReviewList } from '../pages/BookReviewList';
import { useSelector } from 'react-redux';
import { Profile } from '../pages/Profile';
import { NewBookReview } from '../pages/NewBookReview';
import { BookReviewDetail } from '../pages/BookReviewDetail';
import { EditBookReview } from '../pages/EditBookReview';
import React from 'react';

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/public/books" element={<BookReviewList />}  />
        {auth ? (
          <>
            <Route path="/books" element={<BookReviewList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/new" element={<NewBookReview />}  />
            <Route path="/books/:id" element={<BookReviewDetail />} />
            <Route path="/edit/:id" element={<EditBookReview />} />
            <Route path="/profile" element={<Profile />}  />
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
