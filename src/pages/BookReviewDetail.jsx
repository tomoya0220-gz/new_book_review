import { useEffect, useState } from "react";
import { url } from "../const";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import './BookReviewDetail.css';

export const BookReviewDetail = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const token = cookies.token;
        if (!token) {
          throw new Error('認証トークンがありません');
        }
        const response = await axios.get(`${url}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReview(response.data);
        setLoading(false);
      } catch (error) {
        setError('書籍情報の取得に失敗しました');
        setLoading(false);
      }
    };
    fetchReview();
  }, [id, cookies]);

  if (loading) {
    return <p className="loading">データを取得中...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!review) {
    return <p>レビューが見つかりません。</p>;
  }

  return (
    <>
      <h2>{review.title}</h2>
      <p>URL: <a href={review.url}>{review.url}</a></p>
      <p>詳細: {review.detail}</p>
      <p>レビュー: {review.reviewer}</p>
      <p>自身のレビュー: {review.isMine ? 'はい' : 'いいえ'}</p>
      {review.isMine && (
        <>
          <Link to={`/edit/${review.id}`}>編集</Link>
        </>
      )}
    </>
  );
};