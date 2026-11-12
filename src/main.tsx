import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'fancy-ui-react/styles.css'
import './index.css'
import { App } from './App'

// BASE_URL is '/' in dev and '/le.gume/' in the Pages build (see vite.config.ts).
// React Router needs it as a basename so every link stays mount-relative.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
