import cartReducer from "./Cart";
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'



// Kết hợp các reducer thành rootReducer
const rootReducers = combineReducers({
  cart: cartReducer,
})

const persistConfig = {
  key: 'root', //key lưu trữ
  storage, // lưu vào localstorage
  ưhitelist: ['cart'],
}

//quản lý lưu trữ và khôi phục
const persistedReducer = persistReducer(persistConfig, rootReducers)

//tạo kho store với reducer là persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
})

export const persistor = persistStore(store)
