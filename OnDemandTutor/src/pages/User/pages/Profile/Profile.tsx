import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../../utils/firebase'
import { v4 } from 'uuid'
import userImage from '../../../../assets/img/user.svg'
import { User } from '../../../../types/user.type'
import { UpdateReqBody } from '../../../../types/user.request.type'

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
  const [urlImage, setUrlImage] = useState<string | null>(null)

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

  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { data: ProfileData, refetch } = useQuery({
    queryKey: ['Account'],
    queryFn: userApi.getProfile
  })

  const profile = ProfileData?.data.data

  useEffect(() => {
    if (profile) {
      setValue('fullName', profile.fullName || '')
      setValue('avatar', profile.avatar || '')
      setValue('phone', profile.phone || '')
      setValue('address', profile.address || '')
      setValue('gender', profile.gender || '')
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

  const uploadAvatar = async (file: File): Promise<string> => {
    const imageRef = ref(storage, `avatarUser/${file.name + v4()}`)
    const snapshot = await uploadBytes(imageRef, file)
    const url = await getDownloadURL(snapshot.ref)
    return url
  }

  const avatar = watch('avatar')
  console.log('avatar', avatar)

  function convertDateOfBirth(date_of_birth: string): string {
    const dateOfBirth = date_of_birth
      ? new Date(date_of_birth)
      : new Date('1990-01-01')

    return `${dateOfBirth.getFullYear()}-${String(
      dateOfBirth.getMonth() + 1
    ).padStart(2, '0')}-${String(dateOfBirth.getDate()).padStart(2, '0')}`
  }

  const onSubmit = handleSubmit(async (data: FormData) => {
    console.log(data)

    try {
      if (file) {
        const url = await uploadAvatar(file)
        console.log('url', url)
        setUrlImage(url)

        setValue('avatar', url) // Update the avatar URL in form data
        setFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }

      const avatarUrl = typeof urlImage === 'string' ? urlImage : ''

      const formData: UpdateReqBody = {
        fullName:
          data.fullName !== profile?.fullName
            ? data.fullName
            : profile?.fullName || '',
        phone:
          data.phone !== profile?.phone ? data.phone! : profile?.phone || '',
        address:
          data.address !== profile?.address
            ? data.address || ''
            : profile?.address || '',
        gender:
          data.gender !== profile?.gender
            ? data.gender || ''
            : profile?.gender || '',
        date_of_birth:
          convertDateOfBirth(data.date_of_birth?.toString() || '') !==
          profile?.date_of_birth
            ? convertDateOfBirth(data.date_of_birth?.toString() || '')
            : profile?.date_of_birth || '',
        avatar: file ? await uploadAvatar(file) : profile?.avatar || ''
      }
      console.log('11111111111')

      console.log('res', formData)

      const updateRes = await updateProfileMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          toast.success(data.data.message)
          setProfile(data.data.data)
          setProfileToLS(data.data.data)
          refetch()
        },
        onError: (error) => {
          toast.error(error.message)
          console.error(error)
        }
      })

      console.log(updateRes)
    } catch (error) {
      console.log(error)
    }
  })

  const handleChangeFile = (file?: File) => {
    setFile(file || null)
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
                src={urlImage ? urlImage : userImage}
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
