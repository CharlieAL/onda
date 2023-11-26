import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { store } from './store'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NextUIProvider>
      <BrowserRouter>
        <Toaster
          position='top-center'
          richColors
          theme='dark'
        />
        <App />
      </BrowserRouter>
    </NextUIProvider>
  </Provider>
)
