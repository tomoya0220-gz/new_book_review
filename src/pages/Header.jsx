import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signOut } from "../authSlice";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { url } from "../const";
import axios from "axios";


export const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { isSignIn, user } = auth;
  const [cookies, setCookie] = useCookies(['token', 'user']);
  const [localUserName, setLocalUserName] = useState(() => {
    try {
      return user ? user.name : cookies.user ? JSON.parse(cookies.user).name : '';
    } catch (e) {
      return '';
    }
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (isSignIn && cookies.token && !localUserName) {
        try {
          const response = await axios.get(`${url}/users`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
          const fetchedUserName = response.data.name;
          setLocalUserName(fetchedUserName);
          setCookie('user', JSON.stringify({ name: fetchedUserName}), { path: '/' });
          dispatch(signIn({ token: cookies.token, user: {name: fetchedUserName } }));
        } catch (error) {
          console.error('Error in Header:', error);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [isSignIn, cookies.token, localUserName, dispatch, setCookie]);


  const handleSignOut = () => {
    dispatch(signOut());
    setLocalUserName('');
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
        <nav>
          <ul>
            {isSignIn ? (
              <>
                <li>{localUserName && `ようこそ、${localUserName}さん`}</li>
                <li><Link to="/profile">ユーザー情報編集</Link></li>
                <li><button onClick={handleSignOut}>ログアウト</button></li>
              </>
            ) : (
              <li><Link to="/login">ログイン</Link></li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};
