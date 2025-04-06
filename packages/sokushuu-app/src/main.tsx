import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import './index.css'
import { Home } from '@/pages/Home'
import { Ai } from '@/pages/Ai'
import { Market } from '@/pages/Market'
import { Search } from '@/pages/Search'
import { Collection } from '@/pages/Collection'
import { Layout } from '@/components/layout'

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ai" element={<Ai />} />
          <Route path="market" element={<Market />} />
          <Route path="search" element={<Search />} />
          <Route path="collection/:slug" element={<Collection />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
