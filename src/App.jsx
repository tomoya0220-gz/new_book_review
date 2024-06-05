import './App.css';
import { Router } from './routes/Router';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { signIn } from './authSlice';
import { Cookies } from 'react-cookie';
import { Header } from './pages/Header';

function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = cookies.get('token');
    console.log('Token from cookies:', token);
    if (token) {
      dispatch(signIn({ token }));
    }
  }, [cookies, dispatch]);

  return (
    <div>
      <Header />
      <Router />
    </div>
  );
}

export default App;
