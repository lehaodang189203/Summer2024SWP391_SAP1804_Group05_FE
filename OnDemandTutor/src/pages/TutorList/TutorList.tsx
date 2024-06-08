import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import me from '../../assets/img/me.jpg'
import {
  faPersonHalfDress,
  faSchool,
  faUserGraduate
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
export default function TutorList() {
  const [isExpanded, setIsExpanded] = useState(false)
  // const [color, setColor] = useState(false)
  const longText =
    'Tôi tốt nghiệp chuyên ngành sư phạm và có nhiều năm kinh nghiệm học tập, giảng dạy tại nhiều trường trên địa bàn thành phố. Với kinh nghiệm lâu năm tôi sẽ giúp các bạn học tiếng Việt một cách nhanh nhất và hiệu quả nhất bằng phương pháp giảng dạy phù hợp với khả năng của mỗi người. Khi tham gia khóa học của tôi, bạn không chỉ được học về ngôn ngữ mà còn được tìm hiểu về văn hóa, lịch sử, ẩm thực và những điều thú vị khác ở Việt Nam.'

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded)
  }

  const constMaxCharacter = 210

  const text = isExpanded ? longText : longText.slice(0, constMaxCharacter)

  // Mảng 10 items
  const items = Array.from({ length: 10 }, (_, index) => index)

  return (
    <div className='bg-gray-100'>
      {items.map((index) => (
        <div
          key={index}
          className='w-[1230px] rounded-3xl border-3 bg-white  h-auto mx-auto  my-5 px-5 hover:shadow-2xl'
        >
          <div className='col-span-12 flex'>
            {/*  img */}
            <div className='col-span-3 '>
              <div className=' mx-8 my-5'>
                <div className='w-[13rem] h-[15rem]  '>
                  <img src={me} alt='' className='w-full h-full' />
                </div>
              </div>
            </div>

            {/* description */}
            <div className='col-span-5 mx-4 my-5'>
              <div className='w-[45rem] h-full py-2'>
                <div className='justify-start flex pl-2'>
                  <div>
                    <h1 className='text-2xl text-bold-sm text-start'>
                      Ngô Quang Phước Thành
                    </h1>
                    {/*  gender */}
                    <div className=' text-lg justify-start flex pl-1 pt-2'>
                      <FontAwesomeIcon
                        icon={faPersonHalfDress}
                        className='pt-2 h-6'
                      />
                      <span className='pl-2 pt-1'>Nam</span>
                    </div>
                    {/* study */}
                    <div className=' text-lg justify-start flex pl-1 pt-2'>
                      <FontAwesomeIcon icon={faSchool} className='pt-2' />
                      <span className='pl-2 pt-1'>60 tiết học đã diễn ra</span>
                    </div>
                    {/* study */}
                    <div className=' text-lg justify-start flex pl-1 pt-2'>
                      <FontAwesomeIcon icon={faUserGraduate} className='pt-2' />
                      <span className='pl-2 pt-1'>Sư Phạm Kĩ thuật</span>
                    </div>

                    {/* Discription */}

                    <div className=' text-lg justify-start flex pl-1 pt-2  '>
                      <span className='text-start text-sm'>
                        {text}
                        <div>
                          {longText.length > constMaxCharacter && (
                            <span
                              onClick={toggleReadMore}
                              style={{
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                                marginTop: '5px'
                              }}
                              className='hover:text-pink-500 text-[0.75rem]'
                            >
                              {isExpanded ? 'Read Less' : 'Read More'}
                            </span>
                          )}
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* button */}
            <div className='col-span-4 w-full  items-end flex'>
              {/* Button */}
              <div className='  mb-4 w-full px-auto mx-auto'>
                <div className='  rounded-lg w-full h-10   bg-pink-400 hover:opacity-80 mx-auto'>
                  <Link
                    to='/'
                    className=' justify-center items-center flex py-2'
                  >
                    Chấp nhận
                  </Link>
                </div>

                <div className=' border-[3px]  rounded-lg w-full  h-10  bg-white hover:bg-slate-200 mt-2 mx-auto'>
                  <Link
                    to='/'
                    className=' justify-center items-center flex py-2'
                  >
                    Nhắn tin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Phân trang */}
      <Pagination pageSize={10} />
    </div>
  )
}
