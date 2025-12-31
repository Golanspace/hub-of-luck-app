import React from 'react';
import { createRoot } from 'react-dom/client';

// This file is used for local preview.
// The actual WordPress deployment uses the elementor-deployment.html code.
console.log("HUB_OF_LUCK: Dev Preview Mounted.");

const container = document.getElementById('hol-mount-point');
if (container) {
  container.innerHTML = `<div style="padding: 100px; text-align: center; color: #64748b;">Loading Native Hub Dev Preview...</div>`;
}