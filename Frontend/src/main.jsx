import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AuthContext from './Context/authContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <App />
    </AuthContext>
  </BrowserRouter>
)
