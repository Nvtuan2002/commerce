import './App.css'
import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { router } from './router';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store'
import '@/configs/axios'
import { Suspense } from 'react'
import { Result } from 'antd'
import placeholderLoading from '@/assets/placeholder-loading.gif'


function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Suspense fallback={
            <Result
              extra={<img src={placeholderLoading} />}
            />
          }>
            <RouterProvider router={router} />
          </Suspense>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
