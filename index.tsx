import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

/**
 * Hub of Luck | Stable Entry Point
 * Mounts the application to the #root element.
 */
const mount = () => {
  const container = document.getElementById('root');
  if (!container) return;

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Mounting error:", err);
  }
};

// Start mount process
mount();