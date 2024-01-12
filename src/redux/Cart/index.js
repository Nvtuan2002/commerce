import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const product = action.payload;
            const exist = state.find((item) => item.id === product.id);
            if (exist) {
                return state.map((item) =>
                    item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
                );
            } else {
                return [...state, { ...product, qty: 1 }];
            }
        },
        deleteItem: (state, action) => {
            const product = action.payload;
            const exist = state.find((item) => item.id === product.id);
            if (exist.qty === 1) {
                return state.filter((item) => item.id !== product.id);
            }
            else {
                return state.map((item) =>
                    item.id === product.id ? { ...exist, qty: exist.qty - 1 } : item
                );
            }
        },
        qtyItem: (state, action) => {
            const product = action.payload;
            const exist = state.find((item) => item.id === product.id);
            if (exist) {
                return state.map((item) =>
                    item.id === product.id ? { ...exist, qty: product.qty } : item
                );
            }
        }
    }
});

export const { addItem, deleteItem, qtyItem } = cartSlice.actions;
export default cartSlice.reducer;
