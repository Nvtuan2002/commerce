import './App.css'
import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { router } from './router';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store'
import { store } from './redux/store'
import '@/configs/axios'


function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
