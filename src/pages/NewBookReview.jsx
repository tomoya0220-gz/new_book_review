import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { url as apiUrl } from "../const";

export const NewBookReview = () => {
  const [title, setTitle] = useState('');
  const [bookUrl, setBookUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  const  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = cookies.token;
      if (!token) {
        throw new Error('認証トークンがありません');
      }
      await axios.post(`${apiUrl}/books`, { title, url: bookUrl, detail, review }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('書籍レビューを登録しました');
      navigate('/public/books');
    } catch (error) {
      setMessage('書籍レビューの登録に失敗しました');
    }
  };

  return (
    <>
      <h2>書籍レビュー登録</h2>
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
          type='text'
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="詳細"
        />
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="レビュー"
        />
        <button type='submit'>登録</button>
      </form>
    </>
  )
}