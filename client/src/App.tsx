import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './routes/auth/Login'
import Landing from './routes/Landing'
import Register from './routes/auth/Register'
import { AuthProvider } from './auth/AuthProvider'
import Profile from './routes/user/Profile'
import { ProtectedRoute } from './auth/ProtectedRoute'
import Dashboard from './routes/user/Dashboard'
import Document from './routes/files/Document'
import SpreadSheet from './routes/files/SpreadSheet'

function App() {

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/profile' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
                    <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
                    <Route path='/document/new' element={<ProtectedRoute> <Document /> </ProtectedRoute>} />
                    <Route path='/:folder_path/:file_id' element={<ProtectedRoute> <SpreadSheet /> </ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
