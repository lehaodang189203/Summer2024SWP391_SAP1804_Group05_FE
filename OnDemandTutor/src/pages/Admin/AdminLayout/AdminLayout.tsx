
import AdminNav from '../Components/AdminNav'
import { Outlet } from 'react-router-dom'



export default function AdminLayout() {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2  border-r-2 rounded-r-lg h-[760px] shadow-black rounded-2xl shadow-xl'><AdminNav/></div>
      <div className='col-span-10  h-[650px] m-7 ml-20'><Outlet/></div>
    </div>
  )
}