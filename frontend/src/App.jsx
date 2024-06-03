import { useState } from 'react'
import './App.css'
import NavBar from './assets/components/shared/NavBar'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
    </>
  )
}
