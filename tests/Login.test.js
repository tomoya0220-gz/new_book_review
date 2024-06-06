import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { Login } from '../src/pages/Login';

test('ログインフォーム', () => {
  render(<Login />);
  expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
});

test('エラーメッセージの表示', async () => {
  render(<Login />);

  const emailInput = screen.getByLabelText(/メールアドレス/i);
  const passwordInput = screen.getByLabelText(/パスワード/i);
  const submitButton = screen.getByRole('button', { name: /ログイン/i });

  fireEvent.change(emailInput, { target: {value: 'wrong@example.com' } });
  fireEvent.change(passwordInput, { target: {value: 'wrongpassword' } });

  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText(/パスワードが正しくありません/i);
  expect(errorMessage).toBeInTheDocument();
});
