import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import React from "react";


export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/login');
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            {auth && (
              <>
                <li><Link to="/profile">ユーザー情報編集</Link></li>
                <li><button onClick={handleSignOut}>ログアウト</button></li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};