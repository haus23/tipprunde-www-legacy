import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

// Global styles
import './styles/index.css';

const appContainer = document.getElementById('app') as HTMLElement;

createRoot(appContainer).render(
  <StrictMode>
    <App />
  </StrictMode>
);
