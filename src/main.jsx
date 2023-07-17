import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

library.add(faMagnifyingGlass)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
