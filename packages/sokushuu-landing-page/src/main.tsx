import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function getOrSetRootElement(): HTMLElement {
  if (!document.getElementById('root')) {
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('id', 'root');
    document.body.appendChild(rootDiv);
  }

  return document.getElementById('root') || document.createElement('div');
}

const root = getOrSetRootElement();

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
