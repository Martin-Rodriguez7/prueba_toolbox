import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filesReducer from '../store/slices/filesSlice';
import SearchBar from '../components/SearchBar';
import api from '../api/api';

// mock para no pegarle a la api real durante los tests
jest.mock('../api/api');

describe('Pruebas de Integración - SearchBar', () => {

    // creamos un store limpio para cada test
    const getFreshStore = (preloadedState) =>
        configureStore({ reducer: { files: filesReducer }, preloadedState });

    beforeEach(() => {
        jest.clearAllMocks();
        // mock para evitar que los useEffect rompan los tests
        api.get.mockResolvedValue({ data: { files: [] } });
    });

    test('seleccionar un archivo debe actualizar el estado de redux', async () => {
        // respuesta de la api mockeada
        api.get.mockResolvedValue({ data: { files: ['test1.csv', 'test2.csv'] } });

        const stateInicial = {
            files: { list: ['test1.csv', 'test2.csv'], selectedFileName: '', data: [] }
        };

        const store = getFreshStore(stateInicial);

        await act(async () => {
            render(
                <Provider store={store}>
                    <SearchBar />
                </Provider>
            );
        });

        const selector = screen.getByLabelText(/Filter by File Name/i);

        // simulamos que el usuario elige un archivo
        await act(async () => {
            fireEvent.change(selector, { target: { value: 'test1.csv' } });
        });

        // esperamos que el estado cambie
        await waitFor(() => {
            expect(store.getState().files.selectedFileName).toBe('test1.csv');
        });
    });

    test('debe listar las opciones que vienen del estado inicial', async () => {
        // Mockeamos la API para que devuelva los mismos archivos
        api.get.mockResolvedValue({ data: { files: ['archivo_a.csv', 'archivo_b.csv'] } });

        const stateManual = {
            files: { list: ['archivo_a.csv', 'archivo_b.csv'], selectedFileName: '' }
        };

        await act(async () => {
            render(
                <Provider store={getFreshStore(stateManual)}>
                    <SearchBar />
                </Provider>
            );
        });

        // Esperamos a que el componente procese la carga asíncrona
        expect(await screen.findByText('archivo_a.csv')).toBeInTheDocument();
        expect(await screen.findByText('archivo_b.csv')).toBeInTheDocument();
    });
});