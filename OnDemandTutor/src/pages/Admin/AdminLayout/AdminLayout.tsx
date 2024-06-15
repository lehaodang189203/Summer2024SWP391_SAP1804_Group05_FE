
import SlideNav from '../Components/SlideNav'
import { Outlet } from 'react-router-dom'



export default function AdminLayout() {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2 bg-slate-500 rounded-r-lg h-[760px]'><SlideNav/></div>
      <div className='col-span-10 bg-pink-200 h-[700px] m-10 ml-20'><Outlet/></div>
    </div>
  )
}