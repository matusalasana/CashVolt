import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { initChartConfig } from './utils/chart';
import { ThemeProvider } from "./context/ThemeContext";

// Initialize Chart settings
initChartConfig();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,               
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 5,   // 5 min cache
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider >
        </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)