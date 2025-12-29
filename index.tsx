import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

/**
 * Hub of Luck | Ultra-Stable Entry Point
 * Ensures DOM readiness before React initialization.
 */
const init = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error("FATAL: Root container #root missing.");
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("React Mounting Error:", err);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}