import axios from "axios";
import { url } from "../const";

export const sendLog = async (bookId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('認証トークンがありません');
    }
    await axios.post(`${url}/logs`, { selectBookId: bookId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('ログ送信に失敗しました:', error);
  }
};