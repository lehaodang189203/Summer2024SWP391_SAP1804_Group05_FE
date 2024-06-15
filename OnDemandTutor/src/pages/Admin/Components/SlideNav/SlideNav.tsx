import { useState } from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../../../constant/path'

export default function SlideNav() {
  const option = ['DashBar', 'StudentList', 'TutorList', 'SessionList']
  const [active, setAtive] = useState('')
  const handleSetActive = (data: string) => {
    setAtive(data)
  }
  return (
    <div className=' h-full p-2 grid grid-flow-row grid-rows-12 pt-10'>
      <div className='row-span-10'>
        <Link to={path.Admin.admin}>
          <button
            className='mr-7 mb-4 ml-7 pr-10 pl-10 p-2 bg-white content-center justify-center hover:bg-slate-400 rounded-md'
            onClick={() => handleSetActive('DashBar')}
          >
            Quản lí Doanh thu
          </button>
        </Link>
        <Link to={path.Admin.studentlist}>
          <button
            className='mr-7 mb-4 ml-7 pr-10 pl-10 p-2 bg-white content-center justify-center hover:bg-slate-400 rounded-md'
            onClick={() => handleSetActive('StudentList')}
          >
            Danh sách Học sinh
          </button>
        </Link>
        <Link to={path.Admin.tutorList}>
          <button
            className='mr-7 mb-4 ml-7 pr-10 pl-10 p-2 bg-white content-center justify-center hover:bg-slate-400 rounded-md'
            onClick={() => handleSetActive('TutorList')}
          >
            Danh sách Giáo Viên
          </button>{' '}
        </Link>
        <Link to={path.Admin.sessionList}>
          <button
            className='mr-7 mb-4 ml-7 pr-10 pl-10 p-2 bg-white content-center justify-center hover:bg-slate-400 rounded-md'
            onClick={() => handleSetActive('SessionList')}
          >
            Danh sách phiên học
          </button>
        </Link>
      </div>

      <div className='row-span-2 text-center'>Admin: Thanh Nguyen</div>
    </div>
  )
}
