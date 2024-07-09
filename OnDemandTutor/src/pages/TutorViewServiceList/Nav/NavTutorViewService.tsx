import { Link, useLocation } from 'react-router-dom'
import { path } from '../../../constant/path'
import { useEffect, useState } from 'react'

export default function NavTutorViewService() {
  const location = useLocation()
  const [selected, setSelected] = useState(location.pathname)

  return (
    <div className='flex justify-around p-5 border-2 shadow-xl mb-5'>
      <Link to={path.tutorViewServiceBooked}>
        <div
          onClick={() => setSelected(path.tutorViewServiceBooked)}
          className={`text-base font-bold cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:bg-pink-600 after:h-0.5 ${
            selected === path.tutorViewServiceBooked
              ? 'text-pink-600 after:w-full'
              : 'hover:text-pink-600 after:w-0 hover:after:w-full'
          } after:transition-all after:ease-in-out after:duration-100`}
        >
          Xem danh sách dịch vụ của bạn
        </div>
      </Link>
      {/* <Link to={path.home}>
        <div
          //onClick={() => setSelected(path.RequestStudentCurrent)}
          className={`text-base font-bold cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:bg-pink-600 after:h-0.5
           //  ${selected === path.RequestStudentCurrent ? 'text-pink-600 after:w-full' : 'hover:text-pink-600 after:w-0 hover:after:w-full'} after:transition-all after:ease-in-out after:duration-100`}
        >
          Xem danh sách bị từ chối
        </div>
      </Link> */}
      {/* <Link to={path.tutorViewServiceNotBooked}>
        <div
          onClick={() => setSelected(path.tutorViewServiceNotBooked)}
          className={`text-base font-bold cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:bg-pink-600 after:h-0.5 ${
            selected === path.tutorViewServiceNotBooked
              ? 'text-pink-600 after:w-full'
              : 'hover:text-pink-600 after:w-0 hover:after:w-full'
          } after:transition-all after:ease-in-out after:duration-100`}
        >
          Xem danh sách chưa được đặt
        </div>
      </Link> */}
    </div>
  )
}
