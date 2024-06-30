import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthContext } from './context/AuthContext.jsx';
import { SearchContextProvider } from './context/SearchContext.jsx'
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AuthContext>
    </QueryClientProvider>
  </React.StrictMode>,
)
