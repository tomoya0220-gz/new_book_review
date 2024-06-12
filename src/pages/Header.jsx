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
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
  const [localUserName, setLocalUserName] = useState(user ? user.name : cookies.user ? JSON.parse(cookies.user).name : '');
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
          console.log('Fetched user name:', fetchedUserName);
          setLocalUserName(fetchedUserName);
          setCookie('user', JSON.stringify({ name: fetchedUserName}), { path: '/' });
          dispatch(signIn({ token: cookies.token, user: {name: fetchedUserName } }));
        } catch (error) {
          console.error('Error fetching user data in Header:', error);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [isSignIn, cookies.token, localUserName, dispatch, setCookie]);

  console.log('Auth status:', isSignIn);
  console.log('User from state:', userName);
  console.log('User from cookies:', cookies.user);
  console.log('Local user name:', localUserName);

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
                <li>{(userName || cookies.user) && `ようこそ、${userName || cookies.user}さん`}</li>
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
