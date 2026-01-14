import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchFilesData = createAsyncThunk(
    'files/fetchData',
    async (fileName = null, { rejectWithValue }) => {
        try {
            const url = fileName ? `/files/data?fileName=${fileName}` : '/files/data';
            const { data } = await api.get(url);
            return data;
        } catch (err) {
            return rejectWithValue(err.message || 'Error al cargar los datos');
        }
    }
);

export const fetchFilesList = createAsyncThunk(
    'files/fetchList',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/files/list');
            return data.files;
        } catch (err) {
            return rejectWithValue(err.message || 'Error al cargar la lista');
        }
    }
);

const filesSlice = createSlice({
    name: 'files',
    initialState: {
        data: [],
        list: [],
        loadingData: false,
        loadingList: false,
        error: null,
        selectedFileName: '',
    },
    reducers: {
        setSelectedFileName: (state, action) => {
            state.selectedFileName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilesData.pending, (state) => {
            state.loadingData = true;
            state.error = null;
        });
        builder.addCase(fetchFilesData.fulfilled, (state, action) => {
            state.loadingData = false;
            state.data = action.payload;
        });
        builder.addCase(fetchFilesData.rejected, (state, action) => {
            state.loadingData = false;
            state.error = action.payload;
        });

        builder.addCase(fetchFilesList.pending, (state) => {
            state.loadingList = true;
        });
        builder.addCase(fetchFilesList.fulfilled, (state, action) => {
            state.loadingList = false;
            state.list = action.payload;
        });
        builder.addCase(fetchFilesList.rejected, (state, action) => {
            state.loadingList = false;
        });
    },
});

export const { setSelectedFileName } = filesSlice.actions;
export default filesSlice.reducer;
