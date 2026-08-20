import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Se algo falhar antes mesmo do React montar (erro de import/módulo), mostra na tela em vez de ficar em branco.
window.addEventListener('error', (event) => {
  const root = document.getElementById('root');
  if (root && !root.hasChildNodes()) {
    root.innerHTML = `<pre style="padding:24px;color:#fecaca;background:#1e1b1b;white-space:pre-wrap;font-family:monospace">${String(
      event.error?.stack || event.message,
    )}</pre>`;
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
