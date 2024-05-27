import { useEffect, useState } from "react";
import './BookReviewList.css';
import { url } from "../const";
import axios from "axios";
import { Pagination } from "./Pagination";

export const BookReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const reviewsPerPage = 10;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('Fetchinig reviews for page:', currentPage);
        const offset = (currentPage - 1) * reviewsPerPage;
        const response = await axios.get(`${url}/public/books`, {
          params: { offset }
        });
        console.log('Response data:', response.data);
        if (Array.isArray(response.data)) {
          setReviews(response.data);
          setTotalReviews(response.data.length);
          console.log('Response set to:', response.data);
        } else {
          console.error('Invalid response format:', response.data);
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('書籍レビューの取得に失敗しました');
      }
    };
    fetchReviews();
  }, [currentPage]);


  console.log('Rendering BookReviewList with currentPage:', currentPage);

  if (error) {
    return <div>{error}</div>;
  }

  if (reviews.length === 0) {
    return <p>レビューが見つかりません。</p>
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
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalReviews / reviewsPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};
