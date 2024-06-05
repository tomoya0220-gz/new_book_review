import axios from 'axios';
import { url } from '../const';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import { useState } from 'react';
import Compressor from 'compressorjs';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('名前は必須'),
  email: Yup.string().email('正しくないメールアドレスです').required('メールアドレスは必須'),
  password: Yup.string().min(6, '6文字以上でお願いします').required('パスワードは必須'),
  image: Yup.mixed()
});

export const Signup = () => {
  const [error, setError] = useState('');

  const handleImageChange = (setFieldValue) => (e) => {
    const file = e.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success(compressedFile) {
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onload = () => {
            setFieldValue('image', reader.result);
          };
        },
        error(err) {
          console.error('画像の保存失敗：', err);
        }
      });
    }
  };

  const handleSubmit = async(values, { setSubmitting }) => {
    setError('');
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image
    };

    try {
      const response = await axios.post(`${url}/users`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('User created:', response.data);
    } catch (error) {
      setError('ユーザー作成に失敗しました')
      console.error('Error creating user:', error.response ? error.response.data : error.message);
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
