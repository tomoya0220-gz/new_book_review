import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom"
import { url } from "../const";

export const EditBookReview = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [bookUrl, setBookUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        console.log('Fetching review for id:', id);
        const token = cookies.token;
        if (!token) {
          throw new Error('認証トークンがありません');
        }
        const response = await axios.get(`${url}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        console.log('Fetched data:', data);
        setTitle(data.title);
        setBookUrl(data.url);
        setDetail(data.detail);
        setReview(data.review);
      } catch (error) {
        console.error('Error fetching review:', error);
        setMessage('書籍情報の取得に失敗しました');
      }
    };
    fetchReview();
  }, [id, cookies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = cookies.token;
      if (!token) {
        throw new Error('認証トークンがありません');
      }
      await axios.put(`${url}/books/${id}`, { title, url: bookUrl, detail, review }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('書籍レビューを更新しました');
      navigate(`/books/${id}`);
    } catch (error) {
      console.error('Error updating review:', error);
      setMessage('書籍レビューの更新に失敗しました');
    }
  };

  const handleDelete = async () => {
    try {
      const token = cookies.token;
      if (!token) {
        throw new Error('認証トークンがありません');
      }
      await axios.delete(`${url}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('書籍レビューを削除しました');
      navigate('/public/books');
    } catch (error) {
      console.error('Error deleting review:', error);
      setMessage('書籍レビューの削除に失敗しました');
    }
  };

  return (
    <>
      <h2>書籍レビュー編集</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
        />
        <input
          type='text'
          value={bookUrl}
          onChange={(e) => setBookUrl(e.target.value)}
          placeholder="URL"
        />
        <input
          type="text"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="詳細"
        />
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="レビュー"
        />
        <button type='submit'>更新</button>
        <button type='button' onClick={handleDelete}>削除</button>
      </form>
    </>
  );
};
