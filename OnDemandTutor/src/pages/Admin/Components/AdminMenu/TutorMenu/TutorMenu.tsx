import { Link } from 'react-router-dom'
import { path } from '../../../../../constant/path'

function TurorMenu() {
  return (
    <>
      <div className='flex bg-slate-400 rounded-lg justify-center mr-10 ml-10'>
        <Link to={path.Admin.tutorList}>
          <button className='p-5 hover:bg-blue-500'>
            Danh sách giảng viên
          </button>
        </Link>
        <div className='p-5'>||</div>
        <Link to={path.Admin.confirmProfileRegisterTT}>
          <button className='p-5 hover:bg-blue-500'>
            Đơn yêu cầu thành giảng viên
          </button>
        </Link>
        <div className='p-5'>||</div>
        <Link to={path.Admin.rejectProfileRegisterTT}>
          <button className='p-5 hover:bg-blue-500'>Đơn đã từ chối</button>
        </Link>
        <div></div>
      </div>
    </>
  )
}

export default TurorMenu
