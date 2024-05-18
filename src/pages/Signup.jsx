import React, { useState } from "react";
import axios from 'axios';
import { url } from "../const";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('名前は必須'),
  email: Yup.string().email('正しくないメールアドレスです').required('メールアドレスは必須'),
  password: Yup.string().min(6, '6文字以上でお願いします').required('パスワードは必須'),
  image: Yup.mixed()
});

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null
  });
  const [ , setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);

    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post(`${url}/users`, data);
      console.log('User created:', response.data);
    } catch (error) {
      setError('ログインに失敗しました')
      console.error('Error creating user:', error);
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
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label>Email</label>
              <input type="text" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label>Password</label>
              <input type="text" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div>
              <label>Image</label>
              <input type="file" onChange={handleImageChange} />
            </div>
            <button type="submit">Sign up</button>
          </form>
        )}
      </Formik>
      <p>
        アカウントをお持ちですか？ <Link to="/login">ログイン</Link>
      </p>
    </>
  );
}