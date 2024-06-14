import { faPersonHalfDress, faSchool, faUserGraduate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { useState } from "react"
import Popup from "../../../../components/Popup/Popup"
interface RegisTTRe {
    name: string
    gender: string
    lessons: string
    major: string
  }
  
export default function TutorRegisterRequest(){
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [currentRegisReTT, setcurrentRegisReTT] = useState<RegisTTRe | null>(null)
  const tutors =
   Array.from({ length: 10 }, (_, index) => ({
    name: 'Ngô Quang Phước Thành',
    gender: 'Nam',
    lessons: 'Bằng Cử Nhân Toán',
    major: 'Toán'
  }))
  const handleClosePopup = () => {
    setIsPopupVisible(false)
    setcurrentRegisReTT(null)
  }
  const handleItemClick = (tutor: RegisTTRe) => {
    setcurrentRegisReTT(tutor)
    setIsPopupVisible(true)
  }
    return(
        <>
            {tutors.map((tutor, index) => (
        <div
          key={index}
          className='w-[1230px] rounded-3xl border-3 bg-transparent border-2  h-auto mx-auto  my-5 px-5 hover:shadow-lg hover:shadow-gray-900'
        >
          <div className='col-span-12 flex'>
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
                  </div>
                </div>
              </div>
            </div>
            {/* button */}
            <div className='col-span-4 w-full h-full'>
              <div className=' h-full w-full justify-end flex '>
                {/*  Trái tim */}
                
              </div>
              {/* Button */}
              <div className=' w-full h-full px-auto mx-auto pt-5 '>
                  <button
                    onClick={()=>handleItemClick(tutor)}
                    className=" rounded-lg w-full h-10   bg-pink-400 hover:opacity-80 mx-auto"
                  >
                   <div className='capitalize justify-center items-center flex py-2'>
                       Xem chi tiết
                    </div>
                  </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isPopupVisible && currentRegisReTT && (
        <Popup
          handleHidden={handleClosePopup}
          renderPopover={
            <div className='overflow-y-auto p-4'>
              {/* img */}
              
              {/* description */}
              <div className='mx-4 my-5'>
                <div className='py-2'>
                  <div className='justify-start flex pl-2'>
                    <div>
                      <h1 className='text-2xl font-bold text-start'>
                        {currentRegisReTT.name}
                      </h1>
                      {/* gender */}
                      <div className='text-lg flex pl-1 pt-2'>
                        <FontAwesomeIcon
                          icon={faPersonHalfDress}
                          className='pt-2 h-6'
                        />
                        <span className='pl-2 pt-1'>{currentRegisReTT.gender}</span>
                      </div>
                      {/* study */}
                      <div className='text-lg flex pl-1 pt-2'>
                        <FontAwesomeIcon icon={faSchool} className='pt-2' />
                        <span className='pl-2 pt-1'>
                          {currentRegisReTT.lessons}
                        </span>
                      </div>
                      {/* study */}
                      <div className='text-lg flex pl-1 pt-2'>
                        <FontAwesomeIcon
                          icon={faUserGraduate}
                          className='pt-2'
                        />
                        <span className='pl-2 pt-1'>{currentRegisReTT.major}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* button */}
              <div className="flex gap-4">
                  <div className=' w-full h-full px-auto mx-auto pt-5 '>
                      <button
                        onClick={()=> 1}
                        className=" rounded-lg w-full h-10   bg-pink-400 hover:opacity-80 mx-auto"
                      >
                      <div className='capitalize justify-center items-center flex py-2'>
                          Xác Nhận
                        </div>
                      </button>
                  </div>
                  <div className=' w-full h-full px-auto mx-auto pt-5 '>
                      <button
                        onClick={()=> 1}
                        className=" rounded-lg w-full h-10   bg-pink-400 hover:opacity-80 mx-auto"
                      >
                      <div className='capitalize justify-center items-center flex py-2'>
                          Từ chối
                        </div>
                      </button>
                  </div>
              </div>
            </div>
          }
        />
      )}
        </>
    )
}