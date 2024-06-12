import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useRef } from 'react'
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext
} from 'react-hook-form'

import me from '../../../../assets/img/me.jpg'
import Input from '../../../../components/Input'
import DateSelect from '../../../../components/DateSelect/DateSelect'
import Button from '../../../../components/Button'
import { UserSchema, userSchema } from '../../../../utils/rules'
import InputNumber from '../../../../components/InputNumber'

type FormData = Pick<
  UserSchema,
  'username' | 'address' | 'phone' | 'date_of_birth' | 'avatar'
>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick([
  'username',
  'address',
  'phone',
  'date_of_birth',
  'avatar'
])

function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()

  return (
    <Fragment>
      {/*  tên */}
      <div className=' mt-6 flex flex-wrap flex-col sm:flex-row'>
        <div className='sm:w-[20%] truncate pt-3 sm:text-right  capitalize'>
          Tên
        </div>
        <div className='sm:w-[80%]  sm:pl-5'>
          <Input
            className='px-3   py-auto  w-full focus:border-gray-500 focus:shawdow-sm rounded-xl my-auto'
            classNameInput='rounded-xl border-2 w-full h-10 text-left  hover:shadow-black hover:shadow-sm pl-2'
            register={register}
            name='name'
            placeholder='Tên'
            errorMessage={errors.username?.message}
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
    </Fragment>
  )
}

export default function Profile() {
  // Using FormContext
  const methods = useForm<FormData>({
    defaultValues: {
      username: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const {
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    control
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })

  const avatar = watch('avatar')
  console.log('avatar', avatar)

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

      <FormProvider {...methods}>
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

            <Info />

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
              <button>Chọn ảnh</button>
              <div className='mt-3 text-gray-400'>
                <div>Dung lượng file tối đa 1 MB</div>
                <div>Định dạng: .JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
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
//         {
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
