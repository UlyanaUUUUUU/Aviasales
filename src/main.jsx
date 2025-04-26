import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { index } from './Store/index.js';

createRoot(document.getElementById('root')).render(
  <Provider store={index}>
    <App />
  </Provider>
);
