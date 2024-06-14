import axios from 'axios';
import { url } from '../const';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useState } from 'react';
import Compressor from 'compressorjs';
import { useDispatch } from 'react-redux';
import { signIn } from '../authSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('名前は必須'),
  email: Yup.string().email('正しくないメールアドレスです').required('メールアドレスは必須'),
  password: Yup.string().min(6, '6文字以上でお願いします').required('パスワードは必須'),
  image: Yup.mixed()
});

export const Signup = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageChange = (setFieldValue) => (e) => {
    const file = e.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success(compressedFile) {
          setFieldValue('image', compressedFile);          
        },
        error(err) {
          console.error('画像の保存失敗：', err);
        }
      });
    }
  };

  const handleSubmit = async(values, { setSubmitting }) => {
    setError('');
    try {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const userResponse = await axios.post(`${url}/users`,  userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { token, user } = userResponse.data;
      dispatch(signIn({ token, user }));
      
      const formData = new FormData();
      formData.append('icon', values.image);

      const uploadResponse = await axios.post(`${url}/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      const iconUrl = uploadResponse.data.iconUrl;

      await axios.put(`${url}/users`,{
        name: values.name,
        icon: iconUrl
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      navigate('/books');
    } catch (error) {
      setError('ユーザー作成に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          image: null
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <label>Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label>Email</label>
              <Field type="text" name="email" />
              <ErrorMessage name="email"  component="div" />
            </div>
            <div>
              <label>Password</label>
              <Field type="text" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <label>Image</label>
              <input 
                type="file" 
                onChange={(e) => handleImageChange(setFieldValue)(e)}
              />
              <ErrorMessage name="image" component="div" />
            </div>
            <button type="submit">Sign up</button>
          </Form>
        )}
      </Formik>
      <p>
        アカウントをお持ちですか？ <Link to="/login">ログイン</Link>
      </p>
      {error && <div>{error}</div>}
    </>
  );
}
