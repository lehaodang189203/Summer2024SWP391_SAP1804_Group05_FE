// // import { faGoogle } from '@fortawesome/free-brands-svg-icons'
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { Link } from 'react-router-dom'

// // export default function RegisterAsTutor() {
// //   return (
// //     <div className='bg-white py-10  w-full '>
// //       <div className='container justify-center flex'>
// //         <form
// //           style={{ background: '#F7F3F3', boxShadow: 'rgba(0, 0, 0, 0.1) -18px 20px 4px 7px' }}
// //           className='p-10 w-4/12  rounded-2xl shadow-neutral-950'
// //         >
// //           <div className='text-2xl'>Đăng Ký Làm Giảng Viên</div>
// //           <div className='mt-8'>
// //             <input
// //               type='email'
// //               placeholder='Email'
// //               className='p-3 w-full outline-none  border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl hover:border-black border-2'
// //             />
// //           </div>
// //           <div className='mt-3 flex gap-3'>
// //             <input
// //               type='text'
// //               placeholder='Fisrt Name'
// //               className='p-3 w-full outline-none  border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl hover:border-black border-2'
// //             />
// //             <input
// //               type='text'
// //               placeholder='Last Name'
// //               className='p-3 w-full outline-none  border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl hover:border-black border-2'
// //             />
// //           </div>
// //           <div className='mt-3'>
// //             <input
// //               type='text'
// //               placeholder='Hotline'
// //               className='p-3 w-full outline-none  border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl hover:border-black border-2'
// //             />
// //           </div>

// //           <div className='mt-3'>
// //             <input
// //               type='date'
// //               placeholder='birth Day'
// //               className='p-3 w-full outline-none  border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl hover:border-black border-2'
// //             />
// //           </div>
// //           <div className='mt-3'>
// //             <input
// //               type='text'
// //               placeholder='User Name'
// //               className='p-3 w-full outline-none  border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl hover:border-black border-2'
// //             />
// //           </div>

// //           <div className='mt-3'>
// //             <input
// //               type='password'
// //               placeholder='Mật Khẩu'
// //               className='p-3 w-full outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  hover:border-black border-2'
// //             />
// //           </div>
// //           <div className='mt-3'>
// //             <input
// //               type='password'
// //               placeholder='Xác nhận mật Khẩu'
// //               className='p-3 w-full outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  hover:border-black border-2 '
// //             />
// //           </div>
// //           <div className='mt-4 flex justify-between pl-5 pr-5'>
// //             <div className='items-center flex gap-2'>
// //               <input type='checkbox' className='cursor-pointer h-5 w-5' />
// //               <span className='pt-1'>Nam</span>
// //             </div>
// //             <div className='items-center flex gap-2'>
// //               <input type='checkbox' className='cursor-pointer h-5 w-5' />
// //               <span className='pt-1'>Nữ</span>
// //             </div>
// //             <div className='items-center flex gap-2'>
// //               <input type='checkbox' className='cursor-pointer h-5 w-5' />
// //               <span className='pt-1'>Khác</span>
// //             </div>
// //           </div>
// //           <div className='mt-3'>
// //             <button className='w-full  rounded-xl text-center bg-pink-300 py-4 px-2 uppercase  text-white text-sm hover:bg-pink-600 flex justify-center items-center'>
// //               Đăng Ký
// //             </button>
// //           </div>

// //           <div className='NleHE1'>
// //             <span>---------------------------</span>
// //             <span className='EMof35'>hoặc</span>
// //             <span>---------------------------</span>
// //           </div>

// //           <div className='justify-center flex py-2'>
// //             <button className=' bg-black text-white border-black border-2 w-[300px] rounded-lg justify-center items-center flex py-2 shadow-2xl hover:bg-white hover:text-black'>
// //               <div className='pr-2'>
// //                 <FontAwesomeIcon icon={faGoogle} />
// //               </div>
// //               <div>Google</div>
// //             </button>
// //           </div>
// //           <div className='my-4'>
// //             <div>
// //               <span className='text-gray-600 mr-1'>Bạn đã có tài khoảng?</span>
// //               <Link className='text-gray-500 underline hover:text-red-500' to='/Login'>
// //                 Đăng Nhập
// //               </Link>
// //             </div>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }
// import { faGoogle } from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Link } from 'react-router-dom'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm } from 'react-hook-form'
// import { schema, Schema } from '../../utils/rules'
// import { useEffect } from 'react'
// import Input from '../../components/Input'
// import { Check } from '../../components/CheckBox/Check'

// type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

// const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

// // type FormData = Pick<
// //   Schema,
// //   | 'email'
// //   | 'password'
// //   | 'confirm_password'
// //   | 'firstName'
// //   | 'lastName'
// //   | 'hotline'
// //   | 'gender'
// //   | 'file'
// // >

// // const registerSchema = schema.pick([
// //   'email',
// //   'password',
// //   'confirm_password',
// //   'firstName',
// //   'lastName',
// //   'hotline',
// //   'gender',
// //   'file'
// // ])

// /*
// const genderItems = [
//   { id: 'gender', name: 'gender', title: 'Nam', value: 'Nam' },
//   { id: 'gender', name: 'gender', title: 'Nữ', value: 'Nữ' },
//   { id: 'gender', name: 'gender', title: 'Khác', value: 'Khác' }
// ]
// */
// export default function RegisterAsTuTor() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//     // useForm tại sao định dạng như vầy
//     // FormData
//   } = useForm<FormData>({
//     // này của yup nha
//     // yupResover  nhận vào 1 cái registerShema để validate sau đó trả về 1 hàm resolver
//     // resolver (useForm) được dùng để chuyển kết quả validate từ yup
//     resolver: yupResolver(registerSchema)
//   })

//   const onSubmit = (data: FormData) => {
//     console.log('Form submitted:', data) //in ra formdata
//     // Xử lý logic tùy chỉnh ở đây
//   }

//   return (
//     <div
//       style={{
//         background: '#F7F3F3',
//         boxShadow: 'rgba(0, 0, 0, 0.1) -18px 20px 4px 7px'
//       }}
//       className='py-10 w-[25rem] rounded-2xl shadow-neutral-950 mx-auto my-[2rem]'
//     >
//       <div className='container justify-center flex'>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className='text-2xl'>Đăng Ký Thành Giảng Viên</div>
//           <div className='flex gap-1'>
//             <Input
//               name='firstName'
//               type='text'
//               placeholder='Họ'
//               className='mt-8'
//               register={register}
//               errorMessage={errors.firstName?.message}
//               autoComplete='on'
//             />
//             <Input
//               name='lastName'
//               type='text'
//               placeholder='Tên'
//               className='mt-8 '
//               register={register}
//               errorMessage={errors.lastName?.message}
//               autoComplete='on'
//             />
//           </div>
//           <Input
//             name='username'
//             type='text'
//             placeholder='User Name'
//             className='mt-1'
//             register={register}
//             errorMessage={errors.username?.message}
//           />
//           <Input
//             name='email'
//             type='email'
//             placeholder='Email'
//             className='mt-1'
//             register={register}
//             errorMessage={errors.email?.message}
//           />

//           <Input
//             name='password'
//             type='password'
//             placeholder='Mật khẩu'
//             className='mt-1s'
//             register={register}
//             errorMessage={errors.password?.message}
//             autoComplete='on'
//           />

//           <Input
//             name='confirm_password'
//             type='password'
//             placeholder='Xác nhận mật khẩu'
//             className='mt-1'
//             register={register}
//             errorMessage={errors.confirm_password?.message}
//             autoComplete='on'
//           />
//           <Input
//             name='hotline'
//             type='text'
//             placeholder='Số Điện Thoại'
//             className='mt-1'
//             register={register}
//             errorMessage={errors.hotline?.message}
//             autoComplete='on'
//           />

//           <div className='flex gap-1'>
//             <Input
//               name='firstName'
//               type='text'
//               placeholder='Họ'
//               className='mt-1'
//               register={register}
//               errorMessage={errors.firstName?.message}
//               autoComplete='on'
//             />
//             <Input
//               name='lastName'
//               type='text'
//               placeholder='Tên'
//               className='mt-1'
//               register={register}
//               errorMessage={errors.lastName?.message}
//               autoComplete='on'
//             />
//           </div>

//           <span>Up load file chứng chỉ</span>
//           <Input
//             name='birthDay'
//             type='Date'
//             placeholder='bbb'
//             className='mt-1'
//             register={register}
//             errorMessage={errors.birthDay?.message}
//           />
//           <InputGender />
//           <div className='mt-3'>
//             <button
//               type='submit'
//               className='w-full rounded-xl text-center bg-pink-300 py-4 px-2 uppercase text-white text-sm hover:bg-pink-600 flex justify-center items-center'
//             >
//               Đăng Ký
//             </button>
//           </div>
//         </form>
//       </div>
//       <div>
//         <div>
//           <span>---------------------------</span>
//           <span>hoặc</span>
//           <span>---------------------------</span>
//         </div>
//         <div className='justify-center flex py-2'>
//           <button className='bg-black text-white border-black border-2 w-[300px] rounded-lg justify-center items-center flex py-2 shadow-2xl hover:bg-white hover:text-black'>
//             <div className='pr-2'>
//               <FontAwesomeIcon icon={faGoogle} />
//             </div>
//             <div>Google</div>
//           </button>
//         </div>
//         <div className='my-4'>
//           <div>
//             <span className='text-gray-600 mr-1'>Bạn đã có tài khoản?</span>
//             <Link
//               className='text-gray-500 underline hover:text-red-500'
//               to='/Login'
//             >
//               Đăng Nhập
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { schema, Schema } from '../../utils/rules'
import { useEffect } from 'react'
import Input from '../../components/Input'
import { Check } from '../../components/CheckBox/Check'
import { SchemaFile, schemaFile } from '../../utils/rulesFIle'
import { useMutation } from '@tanstack/react-query'
import { RegisterATReqBody } from '../../types/user.request.type'
import { regisApi } from '../../api/regis.api'
type FormData = Pick<
  SchemaFile,
  | 'username'
  | 'email'
  | 'password'
  | 'confirm_password'
  | 'firstName'
  | 'lastName'
  | 'hotline'
  | 'gender'
  | 'birthDay'
  | 'file'
>

const registerSchema = schemaFile.pick([
  'username',
  'email',
  'password',
  'confirm_password',
  'firstName',
  'lastName',
  'hotline',
  'gender',
  'birthDay',
  'file'
])
const genderItems = [
  { id: 'gender1', name: 'gender', title: 'Nam', value: 'Nam' },
  { id: 'gender2', name: 'gender', title: 'Nữ', value: 'Nữ' },
  { id: 'gender3', name: 'gender', title: 'Khác', value: 'Khác' }
]
export default function RegisterAsTuTor() {
  const {
    register,
    handleSubmit,
    formState: { errors }
    // useForm tại sao định dạng như vầy
    // FormData
  } = useForm<FormData>({
    // này của yup nha
    // yupResover  nhận vào 1 cái registerShema để validate sau đó trả về 1 hàm resolver
    // resolver (useForm) được dùng để chuyển kết quả validate từ yup
    resolver: yupResolver(registerSchema)
  })
  const navigate = useNavigate()

  const regisATMutation = useMutation({
    mutationFn: (body: RegisterATReqBody) => regisApi.registerAT(body)
  })
  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data) //in ra formdata
    // Xử lý logic tùy chỉnh ở đây
    regisATMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)

        // setIsAuthenticated(true)
        // navigate đươc dùng để điều hướng (in case này là tới thằng /)

        // dấu / đại diện trang hiện tại
        navigate('/')
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div
      style={{
        background: '#F7F3F3',
        boxShadow: 'rgba(0, 0, 0, 0.1) -18px 20px 4px 7px'
      }}
      className='py-10 w-[25rem] rounded-2xl shadow-neutral-950 mx-auto my-[2rem]'
    >
      <div className='container justify-center flex'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='text-2xl'>Đăng Ký Thành Giảng Viên</div>
          <div className='flex gap-1'>
            <Input
              name='firstName'
              type='text'
              placeholder='Họ'
              className='mt-8'
              register={register}
              errorMessage={errors.firstName?.message}
              autoComplete='on'
            />
            <Input
              name='lastName'
              type='text'
              placeholder='Tên'
              className='mt-8 '
              register={register}
              errorMessage={errors.lastName?.message}
              autoComplete='on'
            />
          </div>
          <Input
            name='username'
            type='text'
            placeholder='User Name'
            className='mt-1'
            register={register}
            errorMessage={errors.username?.message}
          />
          <Input
            name='email'
            type='email'
            placeholder='Email'
            className='mt-1'
            register={register}
            errorMessage={errors.email?.message}
          />

          <Input
            name='password'
            type='password'
            placeholder='Mật khẩu'
            className='mt-1s'
            register={register}
            errorMessage={errors.password?.message}
            autoComplete='on'
          />

          <Input
            name='confirm_password'
            type='password'
            placeholder='Xác nhận mật khẩu'
            className='mt-1'
            register={register}
            errorMessage={errors.confirm_password?.message}
            autoComplete='on'
          />
          <Input
            name='hotline'
            type='text'
            placeholder='Số Điện Thoại'
            className='mt-1'
            register={register}
            errorMessage={errors.hotline?.message}
            autoComplete='on'
          />

          <span>Birth Date </span>
          <Input
            name='birthDay'
            type='Date'
            placeholder='bbb'
            className='mt-1'
            register={register}
            errorMessage={errors.birthDay?.message}
          />
          <Check items={genderItems} register={register} />
          <Input
            name='file'
            type='file'
            className='mt-5'
            register={register}
            errorMessage={errors.file?.message}
          />
          <div className='mt-3'>
            <button
              type='submit'
              className='w-full rounded-xl text-center bg-pink-300 py-4 px-2 uppercase text-white text-sm hover:bg-pink-600 flex justify-center items-center'
            >
              Đăng Ký
            </button>
          </div>
        </form>
      </div>
      <div>
        <div>
          <span>---------------------------</span>
          <span>hoặc</span>
          <span>---------------------------</span>
        </div>
        <div className='justify-center flex py-2'>
          <button className='bg-black text-white border-black border-2 w-[300px] rounded-lg justify-center items-center flex py-2 shadow-2xl hover:bg-white hover:text-black'>
            <div className='pr-2'>
              <FontAwesomeIcon icon={faGoogle} />
            </div>
            <div>Google</div>
          </button>
        </div>
        <div className='my-4'>
          <div>
            <span className='text-gray-600 mr-1'>Bạn đã có tài khoản?</span>
            <Link
              className='text-gray-500 underline hover:text-red-500'
              to='/Login'
            >
              Đăng Nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
