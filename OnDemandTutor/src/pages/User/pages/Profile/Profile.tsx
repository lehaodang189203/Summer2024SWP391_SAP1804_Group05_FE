import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import userApi from '../../../../api/user.api'
import Button from '../../../../components/Button'
import DateSelect from '../../../../components/DateSelect/DateSelect'
import GenderSelect from '../../../../components/GenderSelect'
import Input from '../../../../components/Input'
import InputFile from '../../../../components/InputFile'
import InputNumber from '../../../../components/InputNumber'
import { AppContext } from '../../../../context/app.context'
import { setProfileToLS } from '../../../../utils/auth'
import { UpdateSchema, updateSchema } from '../../../../utils/rules'
import { getAvatarUrl } from '../../../../utils/utils'

type FormData = Pick<
  UpdateSchema,
  'fullName' | 'phone' | 'date_of_birth' | 'address' | 'gender' | 'avatar'
>

const profileSchema = updateSchema.pick([
  'fullName',
  'address',
  'phone',
  'date_of_birth',
  'gender',
  'avatar'
])

export default function Profile() {
  const {
    handleSubmit,
    watch,
    setValue,
    register,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      gender: 'nam',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const { setProfile } = useContext(AppContext)

  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    // Tạo URL từ file
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { data: ProfileData, refetch } = useQuery({
    queryKey: ['Account'],
    queryFn: userApi.getProfile
  })

  const profile = ProfileData?.data.data

  useEffect(() => {
    if (profile) {
      setValue('fullName', profile.fullName || ''),
        setValue('avatar', profile.avatar || ''),
        setValue('phone', profile.phone || ''),
        setValue('address', profile.address || ''),
        setValue('gender', profile.gender || ''),
        setValue(
          'date_of_birth',
          profile.date_of_birth
            ? new Date(profile.date_of_birth)
            : new Date(1990, 0, 1)
        )
      setValue('phone', profile.phone || '')
    }
  }, [profile, setValue])

  console.log(ProfileData)

  console.log(profile)

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const uploadAvatarMutation = useMutation({ mutationFn: userApi.uploadAvatar })

  const avatar = watch('avatar')
  console.log('avatar', avatar)

  function converDateOfBirth(date_of_birth: string): string {
    const dateOfBirth = date_of_birth
      ? new Date(date_of_birth)
      : new Date('1990-01-01')

    return `${dateOfBirth.getFullYear()}-${String(
      dateOfBirth.getMonth() + 1
    ).padStart(2, '0')}-${String(dateOfBirth.getDate()).padStart(2, '0')}`
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        console.log(1111)

        // cái formData này là của JS nha =))
        const form = new FormData()
        form.append('file', file)

        const uploadRes = await uploadAvatarMutation.mutateAsync(form, {
          onSuccess: (data) => {
            toast.success(data.data.message)
          },
          onError: (data) => {
            toast.error(data.message)
          }
        })
        console.log(uploadRes.data.data)

        setValue('avatar', avatarName)
        console.log(avatarName)
      }

      const res = await updateProfileMutation.mutateAsync(
        {
          ...data,
          date_of_birth: converDateOfBirth(data.date_of_birth?.toString() || '')
        },
        {
          onSuccess: () => {
            toast.success(res.data.message)
          }
        }
      )

      console.log(res)

      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      // refresh lại API
      refetch()
    } catch (error) {
      console.log(error)
    }
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
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

      <form
        className='mt-8 flex flex-col-reverse md:flex-row md:items-start'
        onSubmit={onSubmit}
      >
        <div className='mt-6 flex-grow md:mt-0'>
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

          <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>
              Tên
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className='px-3 py-auto w-full focus:border-gray-500 focus:shadow-sm rounded-xl my-auto'
                classNameInput='rounded-xl border-2 w-full h-10 text-left hover:shadow-black hover:shadow-sm pl-2'
                name='fullName'
                register={register}
                placeholder='Họ và Tên'
                errorMessage={errors.fullName?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>
              Địa chỉ
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className='px-3 py-auto w-full focus:border-gray-500 focus:shadow-sm rounded-xl my-auto'
                classNameInput='rounded-xl border-2 w-full h-10 text-left hover:shadow-black hover:shadow-sm pl-2'
                name='address'
                register={register}
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>

          {/* số điện thoại */}
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate sm:text-right capitalize'>
              Số điện thoại
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    className='px-3 w-full outline-none focus:border-gray-500 focus:shadow-sm rounded-sm'
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

          {/*  ngày sinh */}
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

          {/*  giới tính */}
          <Controller
            control={control}
            name='gender'
            render={({ field }) => (
              <GenderSelect
                errorMessage={errors.gender?.message}
                onChange={field.onChange}
                value={field.value || 'nam'}
              />
            )}
          />

          <div className='mt-5 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-6 sm:text-right capitalize' />
            <div className='sm:w-[80%] sm:pl-5 flex items-center justify-center'>
              <Button
                className='flex h-9 items-center w-[5rem] bg-pink-400 border-2 rounded-xl px-5 text-sm text-white hover:bg-black'
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
                src='D:\back\Summer2024SWP391_SAP1804_Group05_BE\OnDemandTuTor\ODTLearning/wwwroot/Images/?nh ch?p màn hình 2024-06-03 081237.png'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <InputFile onChange={handleChangeFile} />

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
