import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TokenProvider } from './contexts/tokenProvider.tsx'
import { ChartValuesProvider } from './contexts/chartValuesProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <ChartValuesProvider>
        <App />
      </ChartValuesProvider>
    </TokenProvider>
  </StrictMode>,
)
