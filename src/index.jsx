import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { EasterEggProvider } from './contexts/EasterEggContext';
import './index.css';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <EasterEggProvider>
      <App />
    </EasterEggProvider>
  </React.StrictMode>
);
