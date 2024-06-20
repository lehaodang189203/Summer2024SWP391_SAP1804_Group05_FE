import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import './App.css'
import useRouteElements from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { LocalStrorageEventTarget } from './utils/utils'
import { AppContext } from './context/app.context'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    // lắng nghe sự kiện clearLS trong LocalStrorageEventTarget
    LocalStrorageEventTarget.addEventListener('clearLS', reset)
    // có nghĩa là sau khi  hàm chạy xong thì ta xóa cái sự kiên đó
    // kết thúc nó tránh bị rò rỉ bộ nhớ
    return () => {
      LocalStrorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <div>
      {routeElements}
      {/*  dùng để thể hiện lỗi linh tinh */}
      <ToastContainer />
    </div>
  )
}

export default App
