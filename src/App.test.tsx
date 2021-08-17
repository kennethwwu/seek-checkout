import React from 'react';
import { render } from '@testing-library/react';
import { UserType } from './types/user';
import App from './App';

test('should render', () => {
  const { getByText } = render(<App />);
  const totalText = getByText(/total/i);
  expect(totalText).toBeInTheDocument();
});

test('should render total $987.97', () => {
  jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(key => {
  if (key === 'user') return JSON.stringify(UserType.Default)
  if (key === 'checklist') return JSON.stringify([[1, 1], [2, 1], [3, 1]]);
  const { getByText } = render(<App />);
  const total = getByText(/987.97/i);
  expect(total).toBeInTheDocument();
  jest.clearAllMocks()
  })
})

test('should render total $934.97', () => {
  jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(key => {
  if (key === 'user') return JSON.stringify(UserType.SecondBite)
  if (key === 'checklist') return JSON.stringify([[1, 3], [3, 1]]);
  const { getByText } = render(<App />);
  const total = getByText(/934.97/i);
  expect(total).toBeInTheDocument();
  jest.clearAllMocks()
  })
})

test('should render total $1294.96', () => {
  jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(key => {
  if (key === 'user') return JSON.stringify(UserType.AxilCoffeeRoasters)
  if (key === 'checklist') return JSON.stringify([[2, 3], [3, 1]]);
  const { getByText } = render(<App />);
  const total = getByText(/1294.96/i);
  expect(total).toBeInTheDocument();
  jest.clearAllMocks()
  })
})