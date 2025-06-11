import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './routes/auth/Login'
import Landing from './routes/Landing'
import Register from './routes/auth/Register'
import { AuthProvider } from './auth/AuthProvider'
import Profile from './routes/user/Profile'
import { ProtectedRoute } from './auth/ProtectedRoute'
import Dashboard from './routes/user/Dashboard/Dashboard'
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
                    <Route path='/folders/:folder_hash?' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
                    <Route path='/document/:file_hash' element={<ProtectedRoute> <Document /> </ProtectedRoute>} />
                    <Route path='/sheet/:file_hash' element={<ProtectedRoute> <SpreadSheet /> </ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
