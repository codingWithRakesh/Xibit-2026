import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <button onClick={() => {
          location.href = `http://localhost:8080/api/v2/oauth2/authorization/google`;
        }}>Google</button>
      </div>
    </>
  )
}

export default App
