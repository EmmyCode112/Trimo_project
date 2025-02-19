import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/store'; // Adjust this path if necessary
import App from './App';
import './index.css'; // Adjust this path if necessary
import { GroupProvider } from "./redux/GroupProvider/UseGroup"

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure the element exists in your HTML
root.render(
  <Provider store={store}>
    <GroupProvider>
    <App />
    </GroupProvider>
  </Provider>
);
