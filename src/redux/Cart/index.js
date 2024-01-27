import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { id, quantity, quantityAvailable } = action.payload;
            const exist = state.productList.find((item) => item.id === id);
            if (exist) {
                //tăng số lượng
                let newQuantity = exist.quantity + quantity;
                exist.quantity = newQuantity > quantityAvailable ? quantityAvailable : newQuantity;
            } else {
                //thêm mới
                state.productList.push(action.payload);
            }
        }
    },
    deleteItem: (state, action) => {
    },
    editItem: (state, action) => {

    }
});

export const { addItem, deleteItem, editItem } = cartSlice.actions;
export default cartSlice.reducer;
