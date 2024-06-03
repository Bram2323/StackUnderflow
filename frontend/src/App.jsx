import { Route, Routes } from "react-router-dom"
import { useState } from 'react'
import './App.css'
import NavBar from './components/shared/NavBar'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="" element={<p>Home</p>} />
        <Route path="/vragen" element={<p>Vragen</p>} />
        <Route path="/leaderbord" element={<p>Leaderbord</p>} />
        <Route path="/inloggen" element={<p>Inloggen</p>} />
        <Route path="/registreren" element={<p>Registreren</p>} />

        <Route path="*" element={<p>404 not found</p>} />
      </Routes>
    </>
  )
}
