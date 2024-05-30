import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Input from '../../components/Input'
import { schema, Schema } from '../../utils/rules'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    // Xử lý logic tùy chỉnh ở đây
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
          <div className='text-2xl'>Đăng Nhập </div>

          <Input
            name='email'
            type='email'
            placeholder='email'
            className='mt-8'
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
            <span className='text-gray-600 mr-1'>Bạn chưa có tài khoảng?</span>
            <Link
              className='text-gray-500 underline hover:text-red-500'
              to='/Register'
            >
              Đăng Ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

//  ;<div className='col-span-1'>
//    {/* Đánh giá */}
//    <div className='flex mt-8 border-yellow-400 border-2'>
//      <div className='flex-1'>
//        <div className='border-purple-400 border-2 w-8'>
//          <svg
//            className='px-0 py-0 mx-0 my-0'
//            viewBox='0 0 24 24'
//            fill='currentColor'
//            xmlns='http://www.w3.org/2000/svg'
//          >
//            <path d='M23.97 8.721a.597.597 0 0 0-.507-.413l-7.744-.822-3.172-7.16c-.192-.435-.903-.435-1.095 0l-3.17 7.16-7.745.822a.601.601 0 0 0-.508.413.606.606 0 0 0 .17.635l5.785 5.248-1.616 7.667a.605.605 0 0 0 .586.729.595.595 0 0 0 .3-.081L12 19.003l6.747 3.916c.204.119.46.105.652-.035a.606.606 0 0 0 .234-.613l-1.616-7.668 5.786-5.248a.606.606 0 0 0 .168-.634z' />
//          </svg>
//        </div>
//      </div>

//      <div className='ml-1 flex-1'>
//        <span className='text-bold text-[2rem] text-2xl border-2 border-red-400'>5</span>
//      </div>
//    </div>
//  </div>
