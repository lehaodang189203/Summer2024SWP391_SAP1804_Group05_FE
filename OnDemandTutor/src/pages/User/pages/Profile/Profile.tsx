import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from '../../../../api/user.api'
import Button from '../../../../components/Button'
import DateSelect from '../../../../components/DateSelect/DateSelect'
import Input from '../../../../components/Input'
import InputFile from '../../../../components/InputFile'
import InputNumber from '../../../../components/InputNumber'
import { AppContext } from '../../../../context/app.context'
import {
  UpdateSchema,
  UserSchema,
  updateSchema,
  userSchema
} from '../../../../utils/rules'
import { getAvatarUrl } from '../../../../utils/utils'
import GenderSelect from '../../../../components/GenderSelect'
import { UpdateReqBody } from '../../../../types/user.request.type'

type FormData = Pick<
  UpdateSchema,
  'fullName' | 'phone' | 'date_of_birth' | 'address' | 'gender' | 'email'
>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = updateSchema.pick([
  'fullName',
  'address',
  'phone',
  'date_of_birth',
  'gender',
  'email'
])

export default function Profile() {
  const { setProfile } = useContext(AppContext)

  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { data: ProfileData } = useQuery({
    queryKey: ['Account'],
    // thằng này cũng như vậy mà cách viết khác
    // queryFn: () => userApi.getProfile(),
    queryFn: userApi.getProfile // thằng này cũng là 1 call bakc
  })

  useEffect(() => {
    if (ProfileData) {
      console.log('ProfileData', ProfileData)
    }
  }, [ProfileData])

  const profile = ProfileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const uploadAvatarMutation = useMutation({ mutationFn: userApi.uploadAvatar })

  const {
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    setValue,
    register,
    control
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      gender: '',
      // avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  // đọc xem thử giá trị avaratar nó là gì
  // const avatar = watch('avatar')
  // console.log('avatar', avatar)

  const onSubmit = handleSubmit(async (data) => {
    const dateOfBirth = data.date_of_birth
      ? new Date(data.date_of_birth)
      : new Date('1990-01-01')

    const formattedDateOfBirth = `${dateOfBirth.getFullYear()}-${String(
      dateOfBirth.getMonth() + 1
    ).padStart(2, '0')}-${String(dateOfBirth.getDate()).padStart(2, '0')}`

    if (profile) {
      const body: UpdateReqBody = {
        ...data,
        date_of_birth: formattedDateOfBirth ?? profile.date_of_birth,
        gender: data.gender ?? profile.gender,
        address: data.address ?? profile.address,
        fullName: data.fullName ?? profile.fullName,
        email: profile.email || profile.email,
        phone: data.phone ?? profile.phone
      }
      console.log(body)

      // try {
      //   let avatarName = avatar
      //   if (file) {
      //     const form = new FormData()
      //     form.append('avatar', file)
      //     const upLoadRes = await updateProfileMutation.mutateAsync(form)
      //     console.log(upLoadRes.data.data)

      //     //
      //     avatarName = upLoadResr.data.data
      //     setValue('avatar', avatarName)
      //   }
      //   const res = await updateProfileMutation.mutateAsync({
      //     ...data,
      //     date_of_birth: data.date_of_birth?.toISOString(),
      //     avatar: avatarName
      //   })
      //   setProfile(res.data.data)
      //   setProfileToLS(res.data.data)

      //   toast.success(res.data.message)
      // } catch (error) {
      //   console.log(error)
      //   if (
      //     isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)
      //   ) {
      //     const formError = error.response?.data.data
      //     if (formError) {
      //       Object.keys(formError).forEach((key) => {
      //         setError(key as keyof FormDataError, {
      //           message: formError[key as keyof FormDataError],
      //           type: 'Server'
      //         })
      //       })
      //     }
      //   }
      // }
    }
  })

  const handleChangeFile = (file: File) => {
    setFile(file)
  }

  return (
    <div className=' pb-10 rounded-sm bg-transparent px-2 shadow-md:px-7 md:pb-20 shadow-black '>
      <div className='border-b border-b-gray py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>
          Hồ Sơ của tôi
        </h1>
        <div className='mt-1 text-sm text-gray-700'>
          Quản lý thông tin hồ sơ để bảo vệ tài khoản
        </div>
      </div>

      <form
        className='mt-8 flex flex-col-reverse md:flex-row md:items-start'
        onSubmit={onSubmit}
      >
        <div className='mt-6 flex-grow   md:mt-0'>
          {/* email */}
          <div className='flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>
              Email
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700 sm:text-left ml-3'>
                {profile?.email}
              </div>
            </div>
          </div>

          <div className=' mt-6 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right  capitalize'>
              Tên
            </div>
            <div className='sm:w-[80%]  sm:pl-5'>
              <Input
                className='px-3   py-auto  w-full focus:border-gray-500 focus:shawdow-sm rounded-xl my-auto'
                classNameInput='rounded-xl border-2 w-full h-10 text-left  hover:shadow-black hover:shadow-sm pl-2'
                name='fullName'
                register={register}
                placeholder='Họ và Tên'
                errorMessage={errors.fullName?.message}
              />
            </div>
          </div>

          <div className=' mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right  capitalize'>
              Địa chỉ
            </div>
            <div className='sm:w-[80%]  sm:pl-5'>
              <Input
                className='px-3 py-auto  w-full focus:border-gray-500 focus:shawdow-sm rounded-xl my-auto'
                classNameInput='rounded-xl border-2 w-full h-10 text-left  hover:shadow-black hover:shadow-sm pl-2'
                name='address'
                register={register}
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>

          {/*  số điện thoại */}
          <div className=' mt-2 flex flex-wrap flex-col sm:flex-row '>
            <div className='sm:w-[20%] truncate sm:text-right capitalize'>
              Số điện thoại
            </div>
            <div className='sm:w-[80%]  sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    className='px-3  w-full outline-none   focus:border-gray-500 focus:shawdow-sm rounded-sm'
                    placeholder='Số điện thoại'
                    classNameInput='rounded-xl border-2 w-full h-10 text-left pl-2 hover:shadow-black hover:shadow-sm'
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect
                name='Ngày sinh'
                errorMessage={errors.date_of_birth?.message}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            control={control}
            name='gender'
            render={({ field }) => (
              <GenderSelect
                errorMessage={errors.gender?.message}
                onChange={field.onChange}
                value={field.value || 'male'}
              />
            )}
          />

          <div className='mt-5 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-6 sm:text-right capitalize' />
            <div className='sm:w-[80%] sm:pl-5 flex items-center justify-center  '>
              <Button
                className=' flex h-9 items-center w-[5rem] bg-pink-400 border-2 rounded-xl  px-5  text-sm text-white hover:bg-black'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>

        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                // src={previewImage || getAvatarUrl(avatar)}
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <InputFile onChange={() => handleChangeFile} />

            <div className='mt-3 text-gray-400'>
              <div>Dung lượng file tối đa 1 MB</div>
              <div>Định dạng: .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
