import {
  faAudioDescription,
  faBook,
  faImage,
  faPersonHalfDress,
  faSchool,
  faStar,
  faUserGraduate
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { studentApi } from '../../api/student.api'
import Popup from '../../components/Popup/Popup'
import { TutorType } from '../../types/tutor.type'
import {
  AcceptTutorBody,
  SelecTutorReqBody
} from '../../types/user.request.type'

import userAvatar from '../../assets/img/user.svg'


export default function TutorList() {
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [color, setColor] = useState(false)
  const [currentTutor, setCurrentTutor] = useState<TutorType | null>(null)
  const [searchText, setSearchText] = useState('');

  const { idReq: idRequestParams } = useParams()

  console.log(idRequestParams)

  const { data: TutorListProfile } = useQuery({
    queryKey: ['Request', idRequestParams],
    queryFn: () =>
      studentApi.viewAllTutorsJoinRequests(idRequestParams as string),
      enabled: !!idRequestParams // chắc chắn phải có idREq thì mới gọi
  })

  const selectTutorMutation = useMutation({
    mutationFn: (body: SelecTutorReqBody) => studentApi.selectTutor(body)
  })

  console.log(TutorListProfile)

  const handleClosePopup = () => {
    setIsPopupVisible(false)
    setCurrentTutor(null)
  }

  const handleChangeColor = () => {
    setColor(!color)
  }

  const handleItemClick = (tutor: TutorType) => {
    setCurrentTutor(tutor)
    setIsPopupVisible(true)
  }
  const handleapproved = (idTutor: string) => {
    if (idRequestParams) {
      selectTutorMutation.mutate(
        { idRequest: idRequestParams, idTutor },
        {
          onSuccess: (data) => {
            toast.success(data.data.message)
          },
          onError: (data) => {
            toast.error(data.message)
          }
        }
      )
    } else {
      console.error('Không có id của request')
    }
  }
  const filteredTutors = TutorListProfile?.filter((tutor: TutorType) =>
    tutor.fullName.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div>
       <input
          type='text'
          placeholder='Tìm kiếm gia sư'
          className='border border-gray-300 p-2 rounded-lg w-1/3'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      
      {filteredTutors?.map((tutor, index) => (
        <div
          key={index}
          className='w-[1230px] rounded-3xl border-3 bg-transparent border-2 h-auto mx-auto my-5 px-5 hover:shadow-lg hover:shadow-gray-900'
        > 

          <div className='col-span-12 flex'>
            {/* img */}
            <div className='col-span-3' onClick={() => handleItemClick(tutor)}>
              <div className='mx-8 my-5'>
                <div className='w-[13rem] h-[15rem]'>
                  <img
                    src={tutor.avatar ?  tutor.avatar:userAvatar }
                    // src={tutor.avatar}
                    alt='ảnh đại diện'
                    className='w-full h-full'
                  />
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
                      Tên: {tutor.fullName}
                    </h1>
                    {/* gender */}
                    <div className='text-lg justify-start flex pl-1 pt-2'>
                      <FontAwesomeIcon
                        icon={faPersonHalfDress}
                        className='pt-2 h-6'
                      />
                      <span className='pl-2 pt-1'>
                        Giới tính:{tutor.gender}
                      </span>
                    </div>
                    {/* study */}
                    <div className='text-lg justify-start flex pl-1 pt-2'>
                      <FontAwesomeIcon icon={faSchool} className='pt-2' />
                      <span className='pl-2 pt-1'>
                        Môn học:{''}
                        {tutor.subject}
                      </span>
                    </div>
                    {/* kinh nghiệm */}
                    <div className='text-lg justify-start flex pl-1 pt-2'>
                      <FontAwesomeIcon icon={faUserGraduate} className='pt-2' />
                      <span className='pl-2 pt-1'>
                        Kinh nghiệm:{''}
                        {tutor.experience}
                      </span>
                    </div>
                    {/* kĩ nangư đặc biệt */}
                    <div className='text-lg justify-start flex pl-1 pt-2'>
                      <FontAwesomeIcon icon={faStar} className='pt-2' />
                      <span className='pl-2 pt-1'>
                        Kỹ năng đặc biệt:{''}
                        {tutor.specializedSkills}
                      </span>
                    </div>

                    {/* Description */}
                    {/* <div className='text-lg justify-start flex pl-1 pt-2'>
                      <FontAwesomeIcon
                        icon={faAudioDescription}
                        className='pt-2'
                      />
                      <span className='pl-2 pt-1'>
                        Mô tả:{tutor.introduction}
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* button */}
            <div className='col-span-4 w-full h-full'>
              <div className='h-full w-full justify-end flex'>
                {/*  Trái tim */}
                <div
                  className='mt-2 pr-2'
                  role='button'
                  onClick={handleChangeColor}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill={color ? 'black' : '#FF1493'}
                    className='size-6'
                    viewBox='0 0 24 24'
                  >
                    <path d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z' />
                  </svg>
                </div>
              </div>
              {/* Button */}
              <div className='w-full h-full px-auto mx-auto pt-32'>
                <div className='rounded-lg w-full h-10 bg-pink-400 hover:opacity-80'>
                  <button
                    onClick={() => handleapproved(tutor.id)}
                    className='pt-3'
                  >
                    Chấp nhận
                  </button>
                </div>

                <div className='capitalize border-[3px] rounded-lg w-full h-10 bg-white hover:bg-slate-200 mt-2 mx-auto'>
                  <Link
                    to='/'
                    className='justify-center items-center flex py-2'
                  >
                    Nhắn tin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Pagination */}
      {/* <Pagination totalItems={tutors.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} /> */}
      {isPopupVisible && currentTutor && (
        <Popup
          handleHidden={handleClosePopup}
          renderPopover={
            <div className='overflow-y-auto p-4'>
              {/* img */}
              <div className='flex justify-center py-4'>
                <img
                  src={currentTutor.avatar ? currentTutor.avatar : userAvatar  }
                  alt='gia sư'
                  className='w-32 h-32 rounded-full'
                />
              </div>
              {/* description */}
              <div className='mx-4 my-5'>
                <div className='py-2'>
                  <div className='justify-start flex pl-2'>
                    <div>
                      <h1 className='text-2xl font-bold text-start'>
                        {currentTutor.fullName}
                      </h1>
                      {/* gender */}
                      <div className='text-lg flex pl-1 pt-2'>
                        <FontAwesomeIcon
                          icon={faPersonHalfDress}
                          className='pt-2 h-6'
                        />
                        <span className='pl-2 pt-1'>{currentTutor.gender}</span>
                      </div>

                      {/* subject */}
                      <div className='text-lg justify-start flex pl-1 pt-2'>
                        <FontAwesomeIcon icon={faSchool} className='pt-2 h-6' />
                        <span className='pl-2 pt-1'>
                          Môn học:{''}
                          {currentTutor.subject}
                        </span>
                      </div>

                      {/* study */}
                      <div className='text-lg flex pl-1 pt-2'>
                        <FontAwesomeIcon
                          icon={faUserGraduate}
                          className='pt-2 h-6'
                        />
                        <span className='pl-2 pt-1'>
                          Kinh nghiệm: {currentTutor.experience}
                        </span>
                      </div>
                      {/* Kĩ năng đặc biệt  */}
                      <div className='text-lg flex pl-1 pt-2'>
                        <FontAwesomeIcon icon={faStar} className='pt-2' />
                        <span className='pl-2 pt-1'>
                          Kỹ năng đặc biệt: {currentTutor.specializedSkills}
                        </span>
                      </div>
                      {/* Mô tả */}
                      <div className='text-lg flex pl-1 pt-2'>
                        <FontAwesomeIcon
                          icon={faAudioDescription}
                          className='pt-2 h-6'
                        />
                        <span className='pl-2 pt-1'>
                          Giới thiệu {currentTutor.introduction}
                        </span>
                      </div>
                      {/* Description */}
                      <div className='text-lg flex pl-1 pt-2'>
                        <FontAwesomeIcon icon={faImage} className='pt-2 h-6' />
                        <span className='pl-2 pt-1'>
                          Tên bằng: {currentTutor.qualifiCationName}
                        </span>
                      </div>
                      {/* Description */}
                      <div className='pt-2 text-left'>
                        <FontAwesomeIcon icon={faBook} className='pt-2 h-6' />
                        <span className='pl-2 pt-1'>
                          Mô tả:
                          {currentTutor.introduction}
                        </span>
                      </div>
                      {/* ảnh bằng */}
                      <div>
                        <img
                          src={currentTutor.imageQualification}
                          alt='Ảnh chứng chỉ'
                          className='mt-4'
                        />
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
