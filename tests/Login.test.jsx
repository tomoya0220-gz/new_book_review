import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import { Login } from "../src/pages/Login";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../src/authSlice';
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import '@testing-library/jest-dom';

vi.mock('axios');

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider>
          {ui}
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe('Login', () => {
  test('ログイン画面へ', () => {
    renderWithProviders(<Login />);      

    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
  });

  test('エラーメッセージの表示', async() => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          ErrorMessageJP: 'パスワードが正しくありません'
        }
      }
    });

    renderWithProviders(<Login />);

    const emailInput = screen.getByLabelText(/メールアドレス/i);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    const submitButton = screen.getByRole('button', { name: /ログイン/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
    
    const errorMessage = await screen.findByText(/パスワードが正しくありません/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
