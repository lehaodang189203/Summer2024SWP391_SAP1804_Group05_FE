import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { tutorApi } from '../../../../api/tutor.api'
import { AppContext } from '../../../../context/app.context'
import UpdateMajorTT from './components/UpdateMajorTT'
import UpdateProfile from './components/UpdateProfileTT'

export default function ProfileTT() {
  const [showUpdateOptions, setShowUpdateOptions] = useState(false)
  const { profile } = useContext(AppContext)
  const [selectedUpdate, setSelectedUpdate] = useState<string | null>(null)

  const { data: profileTutor, refetch } = useQuery({
    queryKey: ['Account', profile?.id as string],
    queryFn: async () => await tutorApi.getProfileTT(profile?.id as string),

    enabled: !!profile?.id,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    refetch()
  }, [profile])

  useEffect(() => {}, [profileTutor])

  const handleUpdate = (option: string) => {
    if (showUpdateOptions && selectedUpdate === option) {
      setShowUpdateOptions(false)
      setSelectedUpdate(null)
    } else {
      setShowUpdateOptions(true)
      setSelectedUpdate(option)
    }
  }

  return (
    <div className='pb-10 rounded-sm bg-transparent px-2 md:px-7 md:pb-20 shadow-black'>
      <div className='border-b border-gray-300 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>
          Hồ Sơ của tôi
        </h1>
        <div className='mt-1 text-sm text-gray-700'>
          Quản lý thông tin hồ sơ để bảo vệ tài khoản
        </div>
      </div>

      <div className='mt-8 flex flex-col md:flex-row md:items-start'>
        <div className='flex-grow'>
          <div className='border rounded-lg p-6 shadow-lg bg-white'>
            <div className='flex flex-row mb-4'>
              <div className='w-1/5 text-right capitalize'>Email</div>
              <div className='w-4/5 pl-5 text-gray-700'>{profile?.email}</div>
            </div>

            <div className='flex mb-4'>
              <div className='w-1/5 text-right capitalize'>Môn dạy</div>
              <div className='w-4/5 rounded-xl border-2 h-10 text-left hover:shadow-black hover:shadow-sm pl-2'>
                {profileTutor?.subjects}
              </div>
            </div>

            <div className='flex mb-4'>
              <div className='w-1/5 text-right capitalize'>Kinh nghiệm</div>
              <div className='w-4/5 rounded-xl border-2 h-10 text-left hover:shadow-black hover:shadow-sm pl-2'>
                {profileTutor?.experience}
              </div>
            </div>

            <div className='flex mb-4'>
              <div className='w-1/5 text-right capitalize'>Giới thiệu</div>
              <div className='w-4/5 rounded-xl border-2 h-10 text-left hover:shadow-black hover:shadow-sm pl-2'>
                {profileTutor?.introduction}
              </div>
            </div>

            <div className='w-1/2 mx-auto my-2'>
              <button
                type='button'
                className='w-full p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-300 focus:outline-none relative'
                onClick={() => setShowUpdateOptions(!showUpdateOptions)}
              >
                Cập nhật
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <FontAwesomeIcon
                    icon={showUpdateOptions ? faArrowUp : faArrowDown}
                  />
                </div>
              </button>
            </div>

            {showUpdateOptions && (
              <div className='mt-4 p-4'>
                <button
                  className='w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-300 focus:outline-none mb-4'
                  onClick={() => handleUpdate('profile')}
                >
                  Cập nhật hồ sơ
                </button>
                <button
                  className='w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-300 focus:outline-none'
                  onClick={() => handleUpdate('major')}
                >
                  Cập nhật chuyên ngành
                </button>
              </div>
            )}

            {(selectedUpdate === 'profile' || selectedUpdate === 'major') &&
              showUpdateOptions && (
                <div className='mt-4 p-4'>
                  {selectedUpdate === 'profile' && <UpdateProfile />}
                  {selectedUpdate === 'major' && <UpdateMajorTT />}
                </div>
              )}
          </div>
        </div>

        <div className='hidden md:flex md:w-72 md:border-l md:border-l-gray-200 md:flex-col md:items-center md:justify-center'>
          <div className='my-5 h-64 w-64'>
            <span>Ảnh bằng</span>
            <img
              src={profileTutor?.qualifications.img}
              className='h-full w-full'
              alt='Qualification Image'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
