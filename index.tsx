import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const mountApp = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    console.error("Critical: Could not find #root element.");
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Hub of Luck initialized successfully.");
  } catch (err) {
    console.error("Mounting Error:", err);
    container.innerHTML = `
      <div style="color: white; padding: 40px; background: #0a0f0d; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif; text-align: center;">
        <div>
          <h1 style="color: #ef4444; margin-bottom: 20px;">Mounting Failure</h1>
          <p style="color: #666;">${err instanceof Error ? err.message : String(err)}</p>
          <button onclick="window.location.reload()" style="margin-top: 20px; background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Try Again</button>
        </div>
      </div>
    `;
  }
};

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}