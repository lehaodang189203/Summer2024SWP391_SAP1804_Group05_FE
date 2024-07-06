import { yupResolver } from '@hookform/resolvers/yup'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { tutorApi } from '../../../../api/tutor.api'
import { AppContext } from '../../../../context/app.context'
import { UpdateTTSchema, updateTT } from '../../../../utils/rules'
import UpdateMajorTT from './components/UpdateMajorTT'
import UpdateProfile from './components/UpdateProfileTT'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

type FormData = UpdateTTSchema
const updateTTSchema = updateTT

export default function ProfileTT() {
  const { profile } = useContext(AppContext)
  const [showUpdateOptions, setShowUpdateOptions] = useState(false)
  const [selectedUpdate, setSelectedUpdate] = useState<string | null>(null)

  const { data: profileTutor, refetch } = useQuery({
    queryKey: ['Account'],
    queryFn: () => tutorApi.getProfileTT(profile?.id as string),
    placeholderData: keepPreviousData,
    enabled: !!profile?.id
  })

  const profileTT = profileTutor?.data.data

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(updateTTSchema),
    defaultValues: {
      experience: profileTT?.experience || 0,
      subjects: profileTT?.subjects || '',
      introduction: profileTT?.introduction || '',
      qualificationName: profileTT?.qualifications.name || '',
      speacializedSkill: profileTT?.speacializedSkill || '', // Fixed spelling error
      type: profileTT?.qualifications.type || '', // Ensure correct default value
      qualifications: {
        id: profileTT?.qualifications.id || '',
        type: profileTT?.qualifications.type || '',
        name: profileTT?.qualifications.name || '',
        img: profileTT?.qualifications.img || ''
      }
    }
  })

  useEffect(() => {
    if (profileTT) {
      setValue('speacializedSkill', profileTT.speacializedSkill || '') // Fixed spelling error
      setValue('experience', profileTT.experience || 0)
      setValue('introduction', profileTT.introduction || '')
      setValue('subjects', profileTT.subjects || '')
      setValue('qualifications', profileTT.qualifications || '')
      setValue('type', profileTT.qualifications.type || '')
    }
    refetch()
  }, [profileTT, setValue])

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
    <div className='pb-10 rounded-sm bg-transparent px-2 shadow-md:px-7 md:pb-20 shadow-black'>
      <div className='border-b border-b-gray py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>
          Hồ Sơ của tôi
        </h1>
        <div className='mt-1 text-sm text-gray-700'>
          Quản lý thông tin hồ sơ để bảo vệ tài khoản
        </div>
      </div>

      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow md:mt-0'>
          {/* Khung bọc profileTT */}
          <div className='border rounded-lg p-6 shadow-lg bg-white'>
            {/* email */}
            <div className='flex   flex-row'>
              <div className='w-[20%] truncate pt-3 text-right capitalize'>
                Email
              </div>
              <div className='w-[80%] pl-5'>
                <div className='pt-3 text-gray-700 text-left ml-3'>
                  {profile?.email}
                </div>
              </div>
            </div>

            <div className='mt-6 flex   flex-row'>
              <div className='w-[20%] truncate pt-3 text-right capitalize mr-2'>
                Môn dạy
              </div>
              <div className='w-[80%] rounded-xl border-2 h-10 text-left hover:shadow-black hover:shadow-sm pl-2'>
                {profileTT?.subjects}
              </div>
            </div>

            <div className='mt-2 flex   flex-row'>
              <div className='w-[20%] truncate pt-3 text-right capitalize mr-2'>
                Kinh nghiệm
              </div>

              <div className='w-[80%] rounded-xl border-2 h-10 text-left hover:shadow-black hover:shadow-sm pl-2'>
                {profileTT?.experience}
              </div>
            </div>

            {/* giới thiệu */}
            <div className='mt-2 flex   flex-row '>
              <div className='w-[20%] truncate pt-3 text-right capitalize mr-2'>
                Giới thiệu
              </div>

              <div className='w-[80%] rounded-xl border-2 h-10 text-left hover:shadow-black hover:shadow-sm pl-2'>
                {profileTT?.introduction}
              </div>
            </div>

            <div className='w-[49%] mx-auto my-2 flex'>
              <button
                type='button'
                className='w-full p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-300 focus:outline-none relative'
                onClick={() => setShowUpdateOptions(!showUpdateOptions)}
              >
                Cập nhật
                {/* mũi tên */}
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

        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-64 w-64'>
              <span>Ảnh bằng</span>
              <img
                src={profileTT?.qualifications.img}
                className='h-full w-full'
                alt='Profile Image'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
