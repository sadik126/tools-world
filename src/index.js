import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Authprovider from './Context/Authprovider';
import { HelmetProvider } from 'react-helmet-async';


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
      retry:1,
      staleTime:5*60*1000

    }
  }
})
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <HelmetProvider>
      <Authprovider>
        <App />

      </Authprovider>
      </HelmetProvider>
    

    </React.StrictMode>

  </QueryClientProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
