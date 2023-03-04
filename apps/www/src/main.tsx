import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import { initializeApp } from './firebase/initialize-app';

// Global styles
import './styles/index.css';

// Firebase
initializeApp();

const appContainer = document.getElementById('app') as HTMLElement;

createRoot(appContainer).render(
  <StrictMode>
    <App />
  </StrictMode>
);
