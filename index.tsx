import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const injectGlobalBranding = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.textContent = `
    /* Scope styles to #root to avoid clashing with WordPress/Elementor */
    #root {
      font-family: 'Montserrat', sans-serif;
      --hol-emerald: #10b981;
      --hol-navy: #0f172a;
      background-color: transparent;
    }
    
    #root h1, #root h2, #root h3, #root h4, #root h5, #root h6, #root p, #root span, #root button {
      font-family: 'Montserrat', sans-serif !important;
    }

    /* Modern Scrollbar for the App area */
    .hol-custom-scroll::-webkit-scrollbar { width: 6px; }
    .hol-custom-scroll::-webkit-scrollbar-track { background: transparent; }
    .hol-custom-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
    
    .animate-fadeIn {
      animation: holFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes holFadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Utility to hide horizontal scroll on mobile containers */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(style);
};

injectGlobalBranding();

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}