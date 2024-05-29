import { useEffect, useState } from "react";
import './BookReviewList.css';
import { url } from "../const";
import axios from "axios";
import { Pagination } from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const BookReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const reviewsPerPage = 10;
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('Fetchinig reviews for page:', currentPage);
        const offset = (currentPage - 1) * reviewsPerPage;
        const response = await axios.get(`${url}/public/books`, {
          params: { offset, limit: reviewsPerPage }
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLog = async (reviewId) => {
    try {
      const token = cookies.token;
      if (!token) {
        throw new Error('認証トークンがありません');
      }
      await axios.post(`${url}/logs`, {selectBookId: reviewId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('ログが送信されました:', reviewId);
    } catch (error) {
      console.error('ログの送信に失敗しました:', error);
    }
  };

  const handleReviewClick = async (reviewId) => {
    await handleLog(reviewId);
    navigate(`/books/${reviewId}`);
  };

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
            <button onClick={() => handleReviewClick(review.id)}>詳細はこちら</button>
            <Link to='/new'>書籍レビューを登録</Link>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalReviews / reviewsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
};
