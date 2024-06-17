import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authApi } from '../../api/auth.api'
import Input from '../../components/Input'
import { AppContext } from '../../context/app.context'
import { LoginReqBody } from '../../types/user.request.type'
import { ErrorResponse } from '../../types/utils.type'
import { Schema, schema } from '../../utils/rules'
import { isAxiosError } from '../../utils/utils'

import { HttpStatusCode } from '../../constant/HttpStatusCode.enum'
import { path } from '../../constant/path'
import { getRefreshTokenFromLS } from '../../utils/auth'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setRefreshToken } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: LoginReqBody) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)

    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        const refreshToken = getRefreshTokenFromLS()
        console.log(refreshToken)

        setRefreshToken(refreshToken)
        setIsAuthenticated(true)

        toast.success(data.data.message, {
          icon: false
        })
        navigate(path.home)
      },
      onError: (error) => {
        if (
          isAxiosError<ErrorResponse<any>>(error) &&
          error.response?.status === HttpStatusCode.UnprocessableEntity // 422
        ) {
          const errorAuthen = error.response.data
          console.log(errorAuthen)

          // Hiển thị lỗi trong form
          if (errorAuthen.data) {
            Object.keys(errorAuthen.data).forEach((key) => {
              setError(key as keyof FormData, {
                type: 'server',
                message: errorAuthen.data[key]
              })
            })
          }

          // Hiển thị thông báo lỗi tổng quát
          toast.error(errorAuthen.message)
        } else {
          toast.error('An unexpected error occurred')
        }
      }
    })
  })
  const signInGoogle = () => {}
  return (
    <div className='py-10 w-[25rem] rounded-2xl border-2 mx-auto my-[2rem] bg-transparent hover:shadow-xl hover:shadow-black'>
      <div className='container justify-center flex'>
        <form onSubmit={onSubmit}>
          <div className='text-2xl'>Đăng Nhập</div>
          <Input
            name='email'
            type='email'
            placeholder='Email'
            className='mt-8'
            register={register}
            errorMessage={errors.email?.message}
          />
          <Input
            name='password'
            type='password'
            placeholder='Mật khẩu'
            className='relative'
            register={register}
            errorMessage={errors.password?.message}
            autoComplete='on'
          />
          <div className='mt-3'>
            <button
              type='submit'
              className='w-full rounded-xl text-center bg-pink-300 py-4 px-2 uppercase text-white text-sm hover:bg-pink-600 flex justify-center items-center'
            >
              Đăng Nhập
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
          <button
            className='bg-black text-white border-black border-2 w-[300px] rounded-lg justify-center items-center flex py-2 shadow-2xl hover:bg-white hover:text-black'
            onClick={signInGoogle}
          >
            <div className='pr-2'>
              <FontAwesomeIcon icon={faGoogle} />
            </div>
            <div>Google</div>
          </button>
        </div>
        <div className='my-4'>
          <div>
            <span className='text-gray-600 mr-1'>Bạn chưa có tài khoản? </span>
            <Link
              className='text-gray-500 underline hover:text-red-500'
              to='/register'
            >
              Đăng Ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
