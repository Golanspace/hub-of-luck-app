import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Inject Global Styles and enforce Montserrat
const injectStyles = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.textContent = `
    * {
      font-family: 'Montserrat', sans-serif !important;
    }
    body { 
      background-color: #f8fafc;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .glass-effect { 
      backdrop-filter: blur(12px); 
      background: rgba(255, 255, 255, 0.85); 
    }
    .dark-glass { 
      backdrop-filter: blur(20px); 
      background: rgba(15, 23, 42, 0.95); 
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    /* Animation for smooth entrances */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeInUp {
      animation: fadeInUp 0.6s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
};

injectStyles();

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}