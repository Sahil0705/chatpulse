import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import SocketProvider from './context/Socket';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export const BASE_URL="http://localhost:8080"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
            <App />
            <Toaster />
        </SocketProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
