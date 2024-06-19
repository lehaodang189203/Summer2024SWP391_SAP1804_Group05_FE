import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import './App.css'
import useRouteElements from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const routeElements = useRouteElements()

  return (
    <div>
      {routeElements}
      {/*  dùng để thể hiện lỗi linh tinh */}
      <ToastContainer />
    </div>
  )
}

export default App
