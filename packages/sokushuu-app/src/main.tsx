import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './index.css'
import { Home } from '@/pages/Home'
import { Ai } from '@/pages/Ai'
import { Layout } from '@/components/layout'

function getOrSetRootElement(): HTMLElement {
  if (!document.getElementById('root')) {
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('id', 'root');
    document.body.appendChild(rootDiv);
  }

  return document.getElementById('root') || document.createElement('div');
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/ai',
    element: <Ai />,
  },
  {
    path: '*',
    element: <div>404</div>,
  }
]);

const root = getOrSetRootElement();

createRoot(root).render(
  <StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </StrictMode>,
)
