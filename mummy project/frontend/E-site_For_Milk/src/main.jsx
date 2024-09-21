import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './store.js'
import { ChakraProvider } from '@chakra-ui/react';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider>
    <Provider store={store}>

      <App />
    </Provider>
    </ChakraProvider>
  </BrowserRouter>

)
