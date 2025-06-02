import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './routes/auth/Login'
import Landing from './routes/Landing'
import Register from './routes/auth/Register'
import { AuthProvider } from './auth/AuthProvider'
import Profile from './routes/user/Profile'
import { ProtectedRoute } from './auth/ProtectedRoute'

function App() {

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/profile' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
