import { useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import { path } from '../../constant/path'
import FormRequest from '../FormRequest/FormRequest'

export default function RequestList() {
  const [isExpanded, setIsExpanded] = useState(false)
  // const [color, setColor] = useState(false)
  const longText =
    'Tôi tốt nghiệp chuyên ngành sư phạm và có nhiều năm kinh nghiệm học tập, giảng dạy tại nhiều trường trên địa bàn thành phố. Với kinh nghiệm lâu năm tôi sẽ giúp các bạn học tiếng Việt một cách nhanh nhất và hiệu quả nhất bằng phương pháp giảng dạy phù hợp với khả năng của mỗi người. Khi tham gia khóa học của tôi, bạn không chỉ được học về ngôn ngữ mà còn được tìm hiểu về văn hóa, lịch sử, ẩm thực và những điều thú vị khác ở Việt Nam.'

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded)
  }

  const constMaxCharacter = 210

  const text = isExpanded ? longText : longText.slice(0, constMaxCharacter)

  const items = Array.from({ length: 10 }, (_, index) => index)
  return (
    // <div className='container'>
    //   {items.map((index) => (
    //     <div className='grid grid-cols-12  bg-transparent'>
    //       <div className='col-span-6   w-[600px] h-auto rounded-3xl  mx-5  my-5 px-5 hover:shadow-2xl hover:shadow-black  '>
    //         <div>
    //           {/*  status */}
    //           <div className='my-2'>
    //             <h2 className='text-red-600 text-2xl'>Lớp chưa giao</h2>
    //           </div>

    //           {/* description */}
    //           <div className='text-[1rem] text-left'>
    //             <div className=''>
    //               Môn dạy:{' '}
    //               <span className='text-blue-500 font-bold text-md'>Toán</span>
    //             </div>

    //             <div className='my-1'>
    //               Lớp dạy:{' '}
    //               <span className='text-blue-500 font-bold text-md'>Lớp11</span>
    //             </div>

    //             <div className='my-1'>
    //               Địa chỉ:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9
    //               </span>
    //             </div>

    //             <div className='my-1'>
    //               Mức lương:{' '}
    //               <span className='text-red-400 font-bold text-md'>
    //                 2.160.000đ/tháng, 180k/buổi
    //               </span>
    //             </div>

    //             <div className='my-1'>
    //               Số buổi:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 3 Buổi /Tuần – Dạy 120phút/Buổi
    //               </span>{' '}
    //             </div>

    //             <div className='my-1'>
    //               Thời gian:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 {' '}
    //                 Chọn Sáng T2345 (10h - 12h)
    //               </span>{' '}
    //             </div>

    //             <div className='my-1'>
    //               Thông tin:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 {' '}
    //                 Học Sinh Nữ (Lớp 10 Lên 11), Trường Vinschool
    //               </span>
    //             </div>
    //             <div className='my-1'>
    //               Yêu cầu:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 Sinh Viên Nam/Nữ
    //               </span>{' '}
    //             </div>
    //             <div className='my-1'>
    //               Hình thức:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 {' '}
    //                 Dạy Offline (Trực Tiếp)
    //               </span>
    //             </div>
    //             <div className='my-1'>
    //               Liên hệ:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 0373.580.580 - 0932.609.268
    //               </span>{' '}
    //             </div>
    //           </div>
    //           {/* button */}
    //           <div className='col-span-4 w-full  items-end flex'>
    //             {/* Button */}
    //             <div className='  my-4 w-full px-auto mx-auto'>
    //               <div className='border-black border-[3px] rounded-lg w-full h-10   bg-pink-400 hover:opacity-80 mx-auto'>
    //                 <Link
    //                   to='/'
    //                   className=' justify-center items-center flex py-2'
    //                 >
    //                   Nhận Lớp
    //                 </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className='col-span-6 w-[600px] h-auto rounded-3xl  mx-auto  my-5 px-5 hover:shadow-2xl hover:shadow-black'>
    //         <div>
    //           {/*  status */}
    //           <div className='my-2'>
    //             <h2 className='text-red-600 text-2xl'>Lớp chưa giao</h2>
    //           </div>

    //           {/* description */}
    //           <div className='text-[1rem] text-left'>
    //             <div className=''>
    //               Môn dạy:{' '}
    //               <span className='text-blue-500 font-bold text-md'>Toán</span>
    //             </div>

    //             <div className='my-1'>
    //               Lớp dạy:{' '}
    //               <span className='text-blue-500 font-bold text-md'>Lớp11</span>
    //             </div>

    //             <div className='my-1'>
    //               Địa chỉ:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9
    //               </span>
    //             </div>

    //             <div className='my-1'>
    //               Mức lương:{' '}
    //               <span className='text-red-400 font-bold text-md'>
    //                 2.160.000đ/tháng, 180k/buổi
    //               </span>
    //             </div>

    //             <div className='my-1'>
    //               Số buổi:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 3 Buổi /Tuần – Dạy 120phút/Buổi
    //               </span>{' '}
    //             </div>

    //             <div className='my-1'>
    //               Thời gian:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 {' '}
    //                 Chọn Sáng T2345 (10h - 12h)
    //               </span>{' '}
    //             </div>

    //             <div className='my-1'>
    //               Thông tin:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 {' '}
    //                 Học Sinh Nữ (Lớp 10 Lên 11), Trường Vinschool
    //               </span>
    //             </div>
    //             <div className='my-1'>
    //               Yêu cầu:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 Sinh Viên Nam/Nữ
    //               </span>{' '}
    //             </div>
    //             <div className='my-1'>
    //               Hình thức:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 {' '}
    //                 Dạy Offline (Trực Tiếp)
    //               </span>
    //             </div>
    //             <div className='my-1'>
    //               Liên hệ:{' '}
    //               <span className='text-black font-bold text-md'>
    //                 0373.580.580 - 0932.609.268
    //               </span>{' '}
    //             </div>
    //           </div>
    //           {/* button */}
    //           <div className='col-span-4 w-full  items-end flex'>
    //             {/* Button */}
    //             <div className='  my-4 w-full px-auto mx-auto'>
    //               <div className='border-black border-[3px] rounded-lg w-full h-10   bg-pink-400 hover:opacity-80 mx-auto'>
    //                 <Link
    //                   to={path.detailRequest}
    //                   className=' justify-center items-center flex py-2'
    //                 >
    //                   Nhận Lớp
    //                 </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    //   {/* Phân trang */}
    //   <Pagination pageSize={10} />
    // </div>

    <FormRequest />
  )
}
