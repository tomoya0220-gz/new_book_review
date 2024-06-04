import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { Login } from "../src/pages/Login";
import test, { expect } from "playwright/test";

test('ログインフォーム', () => {
  render(<Login />);

  expect(screen.getByText('ログイン')).toBeInTheDocument();
  expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
  expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
});

test('エラーメッセージ表示', async() => {
  render(<Login />);

  fireEvent.change(screen.getByLabelText('メールアドレス'), { target: { value: 'wrong@example.com' } });
  fireEvent.change(screen.getByLabelText('パスワード'), { target: { value: 'wrongpassword' } });
  fireEvent.click(screen.getByText('ログイン'));

  expect(await screen.findByText('ログインに失敗しました')).toBeInTheDocument();
});

test('ログイン成功時', async() => {
  render(<Login />);

  fireEvent.change(screen.getByLabelText('メールアドレス'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('パスワード'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText('ログイン'));

  expect(await screen.findByText('ログインに失敗しました')).not.toBeInTheDocument();
});
