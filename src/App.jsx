import { useCookies } from 'react-cookie';
import './App.css';
import { Router } from './routes/Router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { signIn } from './authSlice';

function App() {
  const [cookies] = useCookies(['token']);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies.token) {
      dispatch(signIn());
    }
  }, [cookies, dispatch]);

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
