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
        },
        setQuantityProduct: (state, action) => {
            const { id, quantity, quantityAvailable } = action.payload
            let selectedItem = state.productList.find(item => {
                return item.id == id
            })

            if (selectedItem) {
                let newQuantity = quantity
                selectedItem.quantity = newQuantity <= quantityAvailable ? newQuantity : quantityAvailable
            }
        },
        removeProduct: (state, action) => {
            const id = action.payload
            state.productList = state?.productList?.filter(item => {
                return item.id !== id
            })
        },
        clearCart: (state) => {
            state.productList = []
        }
    },
});

export const { addItem, setQuantityProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
