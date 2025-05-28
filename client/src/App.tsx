import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './routes/auth/Login'
import Landing from './routes/Landing'
import Register from './routes/auth/Register'

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
