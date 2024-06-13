import { url } from "../const";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../authSlice";

export const Profile = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [error, setError] = useState('');
  const [cookies, removeCookie] = useCookies(['token']);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${url}/users`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        setName(response.data.name);
      } catch (error) {
        setError('ユーザー情報の取得に失敗しました');
      }
    };

    if (auth && cookies.token) {
      fetchProfile();
    } else {
      setError('認証トークンがありません');
    }
  }, [auth, cookies.token]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${url}/users`, { name }, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setError('ユーザー情報を更新しました');
    } catch (err) {
      setError('ユーザー情報の更新に失敗しました');
    }
  };

  const handleSignOut = () => {
    removeCookie('token');
    dispatch(signOut());
  };

  return (
    <>
      <h2>ユーザー情報更新</h2>
      {error && <p>{error}</p>}
      <div>
        <label>ユーザー名</label>
        <input 
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>更新</button>
      <button onClick={handleSignOut}>ログアウト</button>
    </>
  );
};