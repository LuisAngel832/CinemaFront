import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import  LoginPage  from './pages/LoginPage.jsx'
import { Navbar } from './components/Navbar'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<LoginPage/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
