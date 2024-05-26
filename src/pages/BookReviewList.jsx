import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../const";
import './BookReviewList.css';
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../components/Pagination";
import { fetchReviews } from "../redux/slices/bookSlice";

export const BookReviewList = () => {
  const dispatch = useDispatch();
  const { reviews, status, error } = useSelector((state) => state.books);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    dispatch(fetchReviews(0));
  }, [dispatch, cookies.token]);

  if (status === 'loading') {
    return <p>読み込み中...</p>;
  }

  if (status === 'failed') {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="book-review-list">
        {reviews.map((review) => (
          <div key={review.id} className="book-review-list_item">
            <h2 className="book-review-list_title">{review.title}</h2>
            <p className="book-review-list_content">{review.content}</p>
            <a href={review.url}>詳細はこちら</a>
          </div>
        ))}
      </div>
      <Pagination />
    </>
  );
};
