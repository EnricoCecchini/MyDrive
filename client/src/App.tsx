import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './routes/auth/Login'
import Landing from './routes/Landing'

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Landing />} />
            </Routes>
        </Router>
    )
}

export default App
