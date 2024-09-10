import './index.css'
import { Provider } from 'react-redux';
import { store } from './app/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import PadhamForm from './features/PadhamForm/PadhamForm.jsx';
import PadhamResult from './features/PadhamResult/PadhamResult.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // The main layout or component that contains <Outlet />
    children: [
      {
        path: 'result', // Route for displaying the result
        element: <PadhamResult />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
