import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import userApi from '../../../../api/user.api'
import me from '../../../../assets/img/me.jpg'
import Button from '../../../../components/Button'
import DateSelect from '../../../../components/DateSelect/DateSelect'
import Input from '../../../../components/Input'
import InputFile from '../../../../components/InputFile'
import InputNumber from '../../../../components/InputNumber'
import { AppContext } from '../../../../context/app.context'
import { UserSchema, userSchema } from '../../../../utils/rules'

type FormData = Pick<
  UserSchema,
  'fullName' | 'phone' | 'date_of_birth' | 'avatar'
>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick([
  'fullName',

  'phone',
  'date_of_birth',
  'avatar'
])

export default function Profile() {
  const { setProfile } = useContext(AppContext)

  const [file, setFile] = useState<File>()

  const preViewImage = useMemo(() => {
    //  tạo đường dẫn
    return file ? URL.createObjectURL(file) : ''
  }, [file])

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
    control
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  // đọc xem thử giá trị avaratar nó là gì
  const avatar = watch('avatar')
  console.log('avatar', avatar)

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)

    // try {
    //   let avatarName = avatar
    //   if (file) {
    //     const form = new FormData()
    //     form.append('avatar', file)
    //     const upLoadRes = await updateProfileMutation.mutateAsync(form)
    //     console.log(upLoadRes.data.data)

    //     //
    //     avatarName = upLoadRes.data.data
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
                thanhngo.13@gmail.com
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
                name='Họ và Tên'
                placeholder='Họ và Tên'
                errorMessage={errors.fullName?.message}
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
            render={({ field }) => {
              return (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )
            }}
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
                src={me}
                alt='Avatar'
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

// import { Navigate, Outlet, useRoutes } from 'react-router-dom'
// import TutorList from './pages/TutorList'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import RegisterLayout from './layout/RegisterLayout/RegisterLayout'
// import Home from './pages/Home'
// import path from './constant/path'

// import MainLayout from './layout/MainLayout'

// import RegisterAsTutor from './pages/RegisterAsTutor/RegisterAsTutor'
// import DashBoard from './pages/DashBoard'
// import { useContext } from 'react'
// import { AppContext } from './context/app.context'

// export default function useRouteElements() {
//   function ProtectedRoute() {
//     const { isAuthenticated } = useContext(AppContext)
//     //  nếu có token thì khỏi phải login
//     return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
//   }

//   function RejectedRoute() {
//     //  hàm này dùng cho là khi đã login rồi thì không cho login| regis nưa
//     const { isAuthenticated } = useContext(AppContext)

//     return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
//   }
//   //
//   const routeElements = useRoutes([
//     {
//       path: path.tutorList,
//       index: true,
//       element: (
//         <MainLayout>
//           <TutorList />
//         </MainLayout>
//       )
//     },
//     {
//       path: '',
//       element: <RejectedRoute />,
//       // kiểu như mún vào con thì phải đi qua cha
//       children: [
//         {
//           path: path.login,
//           element: (
//             <RegisterLayout>
//               <Login />
//             </RegisterLayout>
//           )
//         },
//         {C
//           path: path.register,
//           element: (
//             <RegisterLayout>
//               <Register />
//             </RegisterLayout>
//           )
//         },
//         {
//           path: path.registerAsTutor,
//           element: (
//             <MainLayout>
//               <RegisterAsTutor />
//             </MainLayout>
//           )
//         }
//       ]
//     },

//     {
//       path: path.home,
//       element: (
//         <MainLayout>
//           <Home />
//         </MainLayout>
//       )
//     },
//     {
//       path: path.dashBoard,
//       element: (
//         <RegisterLayout>
//           <DashBoard />
//         </RegisterLayout>
//       )
//     }
//   ])

//   return routeElements
// }
