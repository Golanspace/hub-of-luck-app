import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const init = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    document.body.innerHTML = '<div style="color:red; padding:20px;">Critical Error: Target container #root not found.</div>';
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Hub of Luck: UI Engine Started.");
  } catch (err) {
    console.error("Hub of Luck: UI Engine Failure", err);
    container.innerHTML = `
      <div style="color: white; padding: 40px; background: #0a0f0d; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif; text-align: center;">
        <div>
          <h1 style="color: #ef4444; margin-bottom: 20px; font-weight: 900;">HUB INITIALIZATION FAILED</h1>
          <p style="color: #888; font-size: 14px;">${err instanceof Error ? err.message : String(err)}</p>
          <button onclick="window.location.reload()" style="margin-top: 30px; background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; font-weight: 800;">RESTART SYSTEM</button>
        </div>
      </div>
    `;
  }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  window.addEventListener('DOMContentLoaded', init);
}