import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../const';
import { signIn } from '../authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';

const schema = yup.object().shape({
  email: yup.string().email("有効なメールアドレスを入力してください" ).required("メールアドレスは必須です"),
  password: yup.string().min(6, "パスワードは６文字以上でなければなりません").required("パスワードは必須です"),
});

export const Login = () => {
  useEffect(() => {
    console.log('Login component mounted');
  }, []);

  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [, setCookie] = useCookies(['token']);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSignIn = async (data) => {
    console.log('Signing in with data:', data);
    try {
      const response = await axios.post(`${url}/signin`, data);
      const token = response.data.token;
      setCookie('token', token, { path: '/' });
      dispatch(signIn({ token }));
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      const error = err.response && err.response.data ? err.response.data.ErrorMessageJP : 'ログインに失敗しました';
      console.log('Error message set:', error);
      setErrorMessage(error);
    }
  };

  if (auth) {
    return <Navigate to="/public/books" />;
  }

  return (
    <>
      <main>
        <h2>ログイン</h2>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSignIn)}>
          <label>メールアドレス</label>
          <br />
          <input
            type="email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <br />
          <label>パスワード</label>
          <br />
          <input
            type="password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <button type="submit">
            ログイン
          </button>
        </form>
        <p>
          ユーザー作成画面へ <Link to="/signup">ユーザー作成</Link>
        </p>
      </main>
    </>
  );
};
