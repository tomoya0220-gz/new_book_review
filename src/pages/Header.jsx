import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import React from "react";


export const Header = () => {
  const { isSignIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('Auth status:', isSignIn);
  console.log('User:', user);

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/login');
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            {isSignIn ? (
              <>
                <li>{user && `ようこそ、${user.name}さん`}</li>
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