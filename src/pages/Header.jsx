import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import React from "react";


export const Header = () => {
  const isSignIn = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

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
                <li>{user && `ようこそ、&{name}さん`}</li>
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