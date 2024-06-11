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
import Popup from '../../components/Popup/Popup'

interface Tutor {
  name: string
  gender: string
  lessons: string
  major: string
  description: string
}

export default function TutorList() {
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [color, setColor] = useState(false)
  const [currentTutor, setCurrentTutor] = useState<Tutor | null>(null)

  const longText =
    'Tôi tốt nghiệp chuyên ngành sư phạm và có nhiều năm kinh nghiệm học tập, giảng dạy tại nhiều trường trên địa bàn thành phố. Với kinh nghiệm lâu năm tôi sẽ giúp các bạn học tiếng Việt một cách nhanh nhất và hiệu quả nhất bằng phương pháp giảng dạy phù hợp với khả năng của mỗi người. Khi tham gia khóa học của tôi, bạn không chỉ được học về ngôn ngữ mà còn được tìm hiểu về văn hóa, lịch sử, ẩm thực và những điều thú vị khác ở Việt Nam.'

  const tutors = Array.from({ length: 10 }, (_, index) => ({
    name: 'Ngô Quang Phước Thành',
    gender: 'Nam',
    lessons: '60 tiết học đã diễn ra',
    major: 'Sư Phạm Kĩ thuật',
    description: longText
  }))

  const handleClosePopup = () => {
    setIsPopupVisible(false)
    setCurrentTutor(null)
  }

  const handleChangeColor = () => {
    setColor(!color)
  }

  const handleItemClick = (tutor: Tutor) => {
    setCurrentTutor(tutor)
    setIsPopupVisible(true)
  }

  return (
    <div>
      {tutors.map((tutor, index) => (
        <div
          key={index}
          className='w-[1230px] rounded-3xl border-3 bg-transparent border-2  h-auto mx-auto  my-5 px-5 hover:shadow-lg hover:shadow-gray-900'
        >
          <div className='col-span-12 flex'>
            {/* img */}
            <div className='col-span-3 ' onClick={() => handleItemClick(tutor)}>
              <div className=' mx-8 my-5'>
                <div className='w-[13rem] h-[15rem]  '>
                  <img src={me} alt='' className='w-full h-full' />
                </div>
              </div>
            </div>

            {/* description */}
            <div
              className='col-span-5 mx-4 my-5'
              onClick={() => handleItemClick(tutor)}
            >
              <div className='w-[45rem] h-full py-2'>
                <div className='justify-start flex pl-2'>
                  <div>
                    <h1 className='text-2xl text-bold-sm text-start'>
                      {tutor.name}
                    </h1>
                    {/* gender */}
                    <div className=' text-lg justify-start flex pl-1 pt-2'>
                      <FontAwesomeIcon
                        icon={faPersonHalfDress}
                        className='pt-2 h-6'
                      />
                      <span className='pl-2 pt-1'>{tutor.gender}</span>
                    </div>
                    {/* study */}
                    <div className=' text-lg justify-start flex pl-1 pt-2'>
                      <FontAwesomeIcon icon={faSchool} className='pt-2' />
                      <span className='pl-2 pt-1'>{tutor.lessons}</span>
                    </div>
                    {/* study */}
                    <div className=' text-lg justify-start flex pl-1 pt-2'>
                      <FontAwesomeIcon icon={faUserGraduate} className='pt-2' />
                      <span className='pl-2 pt-1'>{tutor.major}</span>
                    </div>

                    {/* Description */}
                    <div className=' text-lg justify-start flex pl-1 pt-2'>
                      <span className='text-start text-sm'>
                        {tutor.description.slice(0, 210)}...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* button */}
            <div className='col-span-4 w-full h-full'>
              <div className=' h-full w-full justify-end flex '>
                {/*  Trái tim */}
                <div
                  className=' mt-2 pr-2'
                  role='button'
                  onClick={handleChangeColor}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill={color ? 'black' : '#FF1493'}
                    className=' size-6  '
                    viewBox='0 0 24 24'
                  >
                    <path d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z' />
                  </svg>
                </div>
              </div>
              {/* Button */}
              <div className=' w-full h-full px-auto mx-auto pt-32 '>
                <div className='  rounded-lg w-full h-10   bg-pink-400 hover:opacity-80 mx-auto'>
                  <Link
                    to='/'
                    className='capitalize justify-center items-center flex py-2'
                  >
                    Chấp nhận
                  </Link>
                </div>

                <div className=' capitalize border-[3px]  rounded-lg w-full  h-10  bg-white hover:bg-slate-200 mt-2 mx-auto'>
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

      {isPopupVisible && currentTutor && (
        <Popup
          handleHidden={handleClosePopup}
          renderPopover={
            <div className='overflow-y-auto p-4'>
              {/* img */}
              <div className='flex justify-center py-4'>
                <img src={me} alt='Tutor' className='w-32 h-32 rounded-full' />
              </div>
              {/* description */}
              <div className='mx-4 my-5'>
                <div className='py-2'>
                  <div className='justify-start flex pl-2'>
                    <div>
                      <h1 className='text-2xl font-bold text-start'>
                        {currentTutor.name}
                      </h1>
                      {/* gender */}
                      <div className='text-lg flex pl-1 pt-2'>
                        <FontAwesomeIcon
                          icon={faPersonHalfDress}
                          className='pt-2 h-6'
                        />
                        <span className='pl-2 pt-1'>{currentTutor.gender}</span>
                      </div>
                      {/* study */}
                      <div className='text-lg flex pl-1 pt-2'>
                        <FontAwesomeIcon icon={faSchool} className='pt-2' />
                        <span className='pl-2 pt-1'>
                          {currentTutor.lessons}
                        </span>
                      </div>
                      {/* study */}
                      <div className='text-lg flex pl-1 pt-2'>
                        <FontAwesomeIcon
                          icon={faUserGraduate}
                          className='pt-2'
                        />
                        <span className='pl-2 pt-1'>{currentTutor.major}</span>
                      </div>
                      {/* Description */}
                      <div className='pt-2 text-left'>
                        {currentTutor.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      )}
    </div>
  )
}
