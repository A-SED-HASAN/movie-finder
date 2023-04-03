import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Routes/Home'
import Movie from './Routes/SingleMovie'
import ErrorPage from './Routes/ErrorPage'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:title/:id' element={<Movie />} />
      <Route path='/*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App
