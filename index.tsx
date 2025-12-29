import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

/**
 * Hub of Luck | Entry Point
 * Unified to React 19 standards.
 */
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("FATAL: Root container #root missing in DOM.");
}