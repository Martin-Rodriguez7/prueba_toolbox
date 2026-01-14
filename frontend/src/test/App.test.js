/* c:\Users\lrodriguez.TDINEW\Desktop\prueba-tec\frontend\src\App.test.js */

import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from '../App';
import api from '../api/api';

jest.mock('../api/api');

beforeEach(() => {
  jest.clearAllMocks();
  api.get.mockResolvedValue({ data: [] });
});

test('renderiza el título de la aplicación', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  const titleElement = screen.getByText(/React Test App/i);
  expect(titleElement).toBeInTheDocument();
});

test('renderiza el encabezado de datos de archivos', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  const headerElement = screen.getByText(/Files Data/i);
  expect(headerElement).toBeInTheDocument();
});