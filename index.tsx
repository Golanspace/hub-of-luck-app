import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("HUB_OF_LUCK: Runtime initialized.");

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
  
  // Send ready signal after a short delay to ensure React is painting
  setTimeout(() => {
    if (window.parent) {
      window.parent.postMessage({ type: 'hol-app-ready' }, '*');
    }
  }, 500);
}