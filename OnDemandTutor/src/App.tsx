import { ToastContainer } from 'react-toastify'
import './App.css'
import useRouteElements from './useRouteElement'
import { useContext, useEffect } from 'react'
import { AppContext } from './context/app.context'
import { LocalStrorageEventTarget } from './utils/utils'

//test
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
