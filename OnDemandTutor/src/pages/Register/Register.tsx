import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { schema, Schema } from '../../utils/rules'
import { useEffect } from 'react'
import { Check } from '../../components/CheckBox/Check'
import http from '../../utils/http'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../api/auth.api'
import { RegisterATReqBody, RegisterReqBody } from '../../types/user.request.type'

type FormData = Pick<Schema, 'username'|'email' | 'password' | 'confirm_password'|'firstName'|'lastName'|'gender'|'birthDate'>
const registerSchema = schema.pick(['username','email', 'password', 'confirm_password','firstName','lastName','gender','birthDate'])
const genderItems = [
  { id: 'gender', name:'gender', title: 'Nam',value:'Nam'},
  { id: 'gender',name:'gender', title: 'Nữ',value:'Nữ' },
  { id: 'gender',name:'gender', title: 'Khác',value:'Khác' },
]
=======
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth.api'
import DateSelect from '../../components/DateSelect/DateSelect'
import GenderSelect from '../../components/GenderSelect'
import Input from '../../components/Input'
import { ResReqBody } from '../../types/user.request.type'
import { Schema, schema } from '../../utils/rules'

type FormData = Pick<
  Schema,
  | 'email'
  | 'password'
  | 'confirm_password'
  | 'date_of_birth'
  | 'firstname'
  | 'lastname'
  | 'gender'
>

const registerSchema = schema.pick([
  'email',
  'password',
  'confirm_password',
  'date_of_birth',
  'firstname',
  'lastname',
  'gender'
])
>>>>>>> refs/remotes/origin/main
export default function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }

    // useForm tại sao định dạng như vầy
    // FormData
  } = useForm<FormData>({
    // này của yup nha
    // yupResover  nhận vào 1 cái registerShema để validate sau đó trả về 1 hàm resolver
    // resolver (useForm) được dùng để chuyển kết quả validate từ yup
    resolver: yupResolver(registerSchema)
  })

<<<<<<< HEAD
  // const onSubmit = (data: FormData) => {
  //   console.log('Form submitted:', data)
  //   // Xử lý logic tùy chỉnh ở đây
  //  // Gửi request POST
  //   http.post('/endpoint', data)
  //   .then(response => {
  //   console.log('Response:', response.data);
  //   })
  //   .catch(error => {
  //   console.error('Error:', error);
  // });
  
  const navigate = useNavigate()

  const registerMutation = useMutation({
    mutationFn: (body: RegisterReqBody) => authApi.register(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)

    registerMutation.mutate(data, {
=======
  const registerAccountMutation = useMutation({
    mutationFn: (body: ResReqBody) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body: ResReqBody = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
>>>>>>> refs/remotes/origin/main
      onSuccess: (data) => {
        console.log(data)

        // setIsAuthenticated(true)
        // navigate đươc dùng để điều hướng (in case này là tới thằng /)

        // dấu / đại diện trang hiện tại
<<<<<<< HEAD
        navigate('/tutorlist')
=======
        navigate('/')
>>>>>>> refs/remotes/origin/main
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })

  return (
    <div
      style={{
        background: '#F7F3F3',
        boxShadow: 'rgba(0, 0, 0, 0.1) -18px 20px 4px 7px'
      }}
      className='py-10 w-[25rem] rounded-2xl shadow-neutral-950 mx-auto my-[2rem]'
    >
      <div className='container mx-auto justify-center flex'>
        <form onSubmit={onSubmit}>
          <div className='text-2xl'>Đăng Ký</div>

          {/* email */}
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
            className='mt-0.5'
            register={register}
            errorMessage={errors.password?.message}
            autoComplete='on'
          />

          <Input
            name='confirm_password'
            type='password'
            placeholder='Nhập lại mật khẩu'
            className='mt-2'
            register={register}
            errorMessage={errors.confirm_password?.message}
            autoComplete='on'
          />
<<<<<<< HEAD
          
          
          <div className='text-left ml-2.5'>Ngày sinh</div>
          <Input
            name='birthDay'
            type='Date'
            placeholder='bbb'
            className='mt-1 items-start'
            register={register}
            errorMessage={errors.birthDate?.message}
          />
          <Check
            items={genderItems}
            register={register}
=======

          <div className='flex  border-solid justify-center'>
            <Input
              name='firstname'
              type='text'
              placeholder='Họ'
              className='mt-2 mr-1'
              register={register}
              errorMessage={errors.firstname?.message}
              autoComplete='on'
            />

            <Input
              name='lastname'
              type='text'
              placeholder='Tên'
              className='mt-2 '
              register={register}
              errorMessage={errors.lastname?.message}
              autoComplete='on'
            />
          </div>

          {/*  thằng controller nó giúp liên kết thằng DateSelect vs React HookForm */}
          <Controller
            // controlle này nó quản lý cái form này , kiểu như mà nó sự thay đổi thì nó sẽ cập nhật
            control={control}
            name='date_of_birth'
            // render là cái show ra
            // filed nó đối tượng thuộc tính mà thằng Controleer cung cấp
            // chẳng hạn như: value, onChange, name, ....
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

          {/*  thằng controller nó giúp liên kết thằng DateSelect vs React HookForm */}
          <Controller
            // controlle này nó quản lý cái form này , kiểu như mà nó sự thay đổi thì nó sẽ cập nhật
            control={control}
            name='gender'
            // render là cái show ra
            // filed nó đối tượng thuộc tính mà thằng Controleer cung cấp
            // chẳng hạn như: value, onChange, name, ....
            render={({ field }) => {
              return (
                <GenderSelect
                  errorMessage={errors.gender?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )
            }}
>>>>>>> refs/remotes/origin/main
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
