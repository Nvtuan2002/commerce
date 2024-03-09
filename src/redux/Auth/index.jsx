import { createSlice } from "@reduxjs/toolkit";
import auth from './thunk'

const initialState = {
    token: '',
    user: {},
    loading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        LogoutRedux: (state) => {
            state.token = '';
            state.user = {};
            state.loading = false;
        },
    },
    extraReducers: auth
});

export const { LoginRedux, LogoutRedux } = authSlice.actions;
export default authSlice.reducer;
