
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Inject Global Styles to force Montserrat and Hub colors site-wide
const injectGlobalBranding = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.textContent = `
    /* GLOBAL THEME OVERRIDE */
    :root {
      --hol-emerald: #10b981;
      --hol-navy: #0f172a;
    }

    /* Force font on every single element to clean up old design */
    html, body, #root, .elementor *, .wp-block-* {
      font-family: 'Montserrat', sans-serif !important;
      -webkit-font-smoothing: antialiased;
    }

    body { 
      background-color: #fcfcfd;
      color: #1e293b;
    }

    /* Selection colors */
    ::selection {
      background: rgba(16, 185, 129, 0.2);
      color: #065f46;
    }

    /* Custom scrollbar for premium feel */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
};

injectGlobalBranding();

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
