
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { ResATReqBody} from '../../types/user.request.type'
import { regisApi } from '../../api/regis.api'
import Input from '../../components/Input'
import TypeSelect from '../../components/TypeSelect'
import ImageUpload from '../../components/ImageUpload'
import { SchemaResAT, schemaResAT } from '../../utils/rulesFIle'
import { omit } from 'lodash'
import { authApi } from '../../api/auth.api'
type FormData = Pick<
  SchemaResAT,
  | 'qualificationName'
  | 'type'
  | 'field'
  | 'experience'
  | 'specializedSkills'
  | 'imageDegree' 
>

const registerATSchema = schemaResAT.pick([
'qualificationName',
'type',
'field',
'experience',
'specializedSkills',
'imageDegree'
])

export default function RegisterAsTuTor() {
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
    resolver: yupResolver(registerATSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: ResATReqBody) => regisApi.registerAT(body)
  })
  
  const onSubmit = handleSubmit((data) => {
      console.log(data)
      const body: ResATReqBody = data
      console.log(body)

      registerAccountMutation.mutate(body, {
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
  })

  return (
    <div
      style={{
        background: '#F7F3F3',
        boxShadow: 'rgba(0, 0, 0, 0.1) -18px 20px 4px 7px'
      }}
      className='py-10 w-[25rem] rounded-2xl shadow-neutral-950 mx-auto my-[2rem]'
    >
      <div className='container justify-center flex'>
        <form onSubmit={onSubmit}>
          <div className='text-2xl'>Đăng Ký Thành Giảng Viên</div>
          <Input
            name='qualificationName'
            type='text'
            placeholder='Tên Bằng Cấp'
            className='mt-5'
            register={register}
            errorMessage={errors.qualificationName?.message}
          />
          <Controller
            control={control}
            name='type'
            render={({ field }) => {
              return (
                <TypeSelect
                  errorMessage={errors.type?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )
            }}
          >
          </Controller>
          <Input
            name='field'
            placeholder='Môn'
            type='text'
            register={register}
            className='mt-5'
            errorMessage={errors.field?.message}
          />
          
          <Input
            name='specializedSkills'
            placeholder='Kĩ Năng Chính'
            type='text'
            register={register}
            className='mt-5'
            errorMessage={errors.specializedSkills?.message}
          />
          <Input
            name='experience'
            placeholder='Số năm kinh nghiệm'
            type='text'
            register={register}
            className='mt-5'
            errorMessage={errors.experience?.message}
          />
          <div className='bg-slate-300 m-5'>cc</div>
          <Input
            name='imageDegree'
            placeholder='=)))'
            type='file'
            register={register}
            className='mt-5'
            errorMessage={errors.imageDegree?.message}
          />
          
          
          
          {/* <Controller
            control={control}
            name='type'
            render={({ field }) => {
              return (
                <TypeSelect
                  errorMessage={errors.imageDegree?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )
            }}
          >
          </Controller> */}
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
