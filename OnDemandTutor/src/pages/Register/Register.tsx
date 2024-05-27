import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { schema, Schema } from '../../utils/rules'
import { useEffect } from 'react'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export default function Register() {
  //
  useEffect(() => {
    console.log('Component mounted')

    // Cleanup: Được gọi khi component unmount (tức là bị gỡ bỏ khỏi DOM)
    return () => {
      console.log('Component unmounted')
    }
  }, [])

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

  //  thằng handleSubmit nhận vào 1 cái Valid và InValid?
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div
      style={{
        background: '#F7F3F3',
        boxShadow: 'rgba(0, 0, 0, 0.1) -18px 20px 4px 7px'
      }}
      className=' py-10 w-[25rem]  rounded-2xl shadow-neutral-950 mx-auto my-[2rem]'
    >
      <div className='container justify-center flex'>
        <form
          onSubmit={(event) => {
            console.log('aa')
          }}
        >
          <div className='text-2xl'>Đăng Ký </div>

          <Input
            name='email'
            type='email'
            placeholder='email'
            className='mt-8'
            register={register}
            errorMessage={errors.email?.message}
            autoComplete='username'
          />

          <Input
            name='password'
            type='password'
            placeholder='Mật khẩu'
            className='mt-1s  '
            register={register}
            errorMessage={errors.password?.message}
            autoComplete='current-password'
          />

          <Input
            name='password'
            type='password'
            placeholder='Xác nhận mật khẩu'
            className='mt-1'
            register={register}
            errorMessage={errors.confirm_password?.message}
            autoComplete='current-password'
          />
          <div className='mt-3'>
            <button className='w-full rounded-xl text-center bg-pink-300 py-4 px-2 uppercase  text-white text-sm hover:bg-pink-600 flex justify-center items-center'>
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
          <button className=' bg-black text-white border-black border-2 w-[300px] rounded-lg justify-center items-center flex py-2 shadow-2xl hover:bg-white hover:text-black'>
            <div className='pr-2'>
              <FontAwesomeIcon icon={faGoogle} />
            </div>
            <div>Google</div>
          </button>
        </div>
        <div className='my-4'>
          <div>
            <span className='text-gray-600 mr-1'>Bạn đã có tài khoảng?</span>
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

// import { faGoogle } from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { Link } from 'react-router-dom'

// export default function Register() {
//   return (
//     <div className='bg-white py-10  w-full '>
//       <div className='container justify-center flex'>
//         <form
//           style={{ background: '#F7F3F3', boxShadow: 'rgba(0, 0, 0, 0.1) -18px 20px 4px 7px' }}
//           className='p-10 w-4/12  rounded-2xl shadow-neutral-950'
//         >
//           <div className='text-2xl'>Đăng Ký Thành Học Sinh</div>
//           hoặc
//           <div>
//             <Link className='text-gray-500 underline hover:text-red-500' to='/registerAT'>
//               Đăng kí làm gia sư
//             </Link>
//           </div>
//           <div className='mt-8'>
//             <input
//               type='email'
//               placeholder='Email'
//               className='p-3 w-full outline-none  border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl hover:border-black border-2'
//             />
//           </div>
//           <div className='mt-3'>
//             <input
//               type='userName'
//               placeholder='User Name'
//               className='p-3 w-full outline-none  border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl hover:border-black border-2'
//             />
//           </div>
//           <div className='mt-3'>
//             <input
//               type='password'
//               placeholder='Mật Khẩu'
//               className='p-3 w-full outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  hover:border-black border-2'
//             />
//           </div>
//           <div className='mt-3'>
//             <input
//               type='password'
//               placeholder='Xác nhận mật Khẩu'
//               className='p-3 w-full outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  hover:border-black border-2'
//             />
//           </div>
//           <div className='mt-3'>
//             <button className='w-full  rounded-xl text-center bg-pink-300 py-4 px-2 uppercase  text-white text-sm hover:bg-pink-600 flex justify-center items-center'>
//               Đăng Ký
//             </button>
//           </div>
//           <div className='NleHE1'>
//             <span>---------------------------</span>
//             <span className='EMof35'>hoặc</span>
//             <span>---------------------------</span>
//           </div>
//           <div className='justify-center flex py-2'>
//             <button className=' bg-black text-white border-black border-2 w-[300px] rounded-lg justify-center items-center flex py-2 shadow-2xl hover:bg-white hover:text-black'>
//               <div className='pr-2'>
//                 <FontAwesomeIcon icon={faGoogle} />
//               </div>
//               <div>Google</div>
//             </button>
//           </div>
//           <div className='my-4'>
//             <div>
//               <span className='text-gray-600 mr-1'>Bạn đã có tài khoảng?</span>
//               <Link className='text-gray-500 underline hover:text-red-500' to='/Login'>
//                 Đăng Nhập
//               </Link>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
