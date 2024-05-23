import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../const";
import './BookReviewList.css';

export const BookReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${url}/books`);
        setReviews(response.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      <div className="book-review-list">
        {reviews.map((review) => (
          <div key={review.id} className="book-review-list_item">
            <h2 className="book-review-list_title">{review.title}</h2>
            <p className="book-review-list_content">{review.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};