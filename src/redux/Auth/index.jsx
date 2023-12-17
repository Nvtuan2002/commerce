import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    user: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        LoginRedux: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        LogoutRedux: (state) => {
            state.token = '';
            state.user = {};
        },
    },
});

export const { LoginRedux, LogoutRedux } = authSlice.actions;
export default authSlice.reducer;
