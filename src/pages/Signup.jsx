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
  const [ , setError] = useState('');

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   image: null
  // });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success(compressedFile) {
          setFormData({
            ...formData,
            image: compressedFile
          });
        },
        error(err) {
          console.error('画像の保存失敗：', err);
        }
      });
    }
  };

  const handleSubmit = async(values, { setSubmitting }) => {
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <label>Name</label>
              <input type="text" name="name" onChange={handleChange} />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label>Email</label>
              <input type="text" name="email" onChange={handleChange} />
              <ErrorMessage name="email"  component="div" />
            </div>
            <div>
              <label>Password</label>
              <input type="text" name="password" onChange={handleChange} />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <label>Image</label>
              <input type="file" onChange={(e) => {
                handleImageChange(e);
                setFieldValue("image", e.target.files[0]);
              }} />
              <ErrorMessage name="image" component="div" />
            </div>
            <button type="submit">Sign up</button>
          </Form>
        )}
      </Formik>
      <p>
        アカウントをお持ちですか？ <Link to="/login">ログイン</Link>
      </p>
    </>
  );
}