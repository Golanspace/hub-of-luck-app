
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to render React app:", error);
    container.innerHTML = `<div style="color: red; padding: 20px;">Mounting Error: ${error instanceof Error ? error.message : String(error)}</div>`;
  }
} else {
  console.error("Could not find root element to mount the app.");
}
