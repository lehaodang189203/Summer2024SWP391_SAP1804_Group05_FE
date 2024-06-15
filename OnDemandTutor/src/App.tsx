import { ToastContainer } from 'react-toastify'
import './App.css'
import useRouteElements from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'

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
