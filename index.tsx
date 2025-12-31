
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Inject Premium Typography & Global Styles
const injectStyles = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.textContent = `
    body { 
      font-family: 'Montserrat', sans-serif; 
      -webkit-font-smoothing: antialiased;
    }
    /* Move all site text to Montserrat - overriding previous Playfair Display font */
    .serif-header { font-family: 'Montserrat', sans-serif; }
    .glass-effect { backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.8); }
    .dark-glass { backdrop-filter: blur(16px); background: rgba(15, 23, 42, 0.9); }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(style);
};

injectStyles();

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
