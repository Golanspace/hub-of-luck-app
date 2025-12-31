import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Use a unique ID to ensure no conflict with WordPress themes
const container = document.getElementById('hol-root') || document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
  console.log("HUB_OF_LUCK: Native App Mounted.");
} else {
  console.error("HUB_OF_LUCK: Could not find mount point #hol-root");
}