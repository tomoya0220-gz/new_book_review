import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../const";
import './BookReviewList.css';
import { useCookies } from "react-cookie";

export const BookReviewList = () => {
  const [cookies] = useCookies(['token']);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${url}/public/books`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        });
        setReviews(response.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('書籍レビューの取得に失敗しました');
      }
    };
    fetchReviews();
  }, [cookies.token]);

  if (error) {
    return <div>{error}</div>;
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
    </>
  );
};