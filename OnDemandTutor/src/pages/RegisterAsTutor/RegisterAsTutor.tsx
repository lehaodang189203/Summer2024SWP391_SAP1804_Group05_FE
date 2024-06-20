import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { SchemaResAT, schemaResAT } from '../../utils/rules'
import Input from 'antd/es/input/Input'
import InputNumber from '../../components/InputNumber'

type FormData = Pick<
  SchemaResAT,
  | 'experience'
  | 'subject'
  | 'imageQualification'
  | 'qualificationName'
  | 'specializedSkills'
  | 'type'
>

const registerATSchema = schemaResAT.pick([
  'experience',
  'subject',
  'imageQualification',
  'qualificationName',
  'specializedSkills',
  'type'
])

export default function RegisterAsTuTor() {
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   setError,
  //   formState: { errors }
  // } = useForm<FormData>({
  //   resolver: yupResolver(registerATSchema)
  // })
  // const onSubmit = handleSubmit((data: any) => {
  //   console.log(111)
  // })
  // return (
  //   <div className='py-10 w-[25rem] rounded-2xl border-2 mx-auto my-[2rem] bg-transparent hover:shadow-xl hover:shadow-black'>
  //     <div className='container mx-auto justify-center flex'>
  //       <form onSubmit={onSubmit}>
  //         <div className='text-2xl'>Đăng Ký Trở thành gia sư</div>
  //         <Input
  //           name='qualificationName'
  //           type='text'
  //           placeholder='Tên chứng chỉ'
  //           className='mt-8'
  //           register={register}
  //           errorMessage={errors.qualificationName?.message}
  //         />
  //         <div className=' mt-2 flex flex-wrap flex-col sm:flex-row '>
  //           <div className='sm:w-[20%] truncate sm:text-right capitalize'>
  //             Số năm kinh nghiệm
  //           </div>
  //           <div className='sm:w-[80%]  sm:pl-5'>
  //             <Controller
  //               control={control}
  //               name='experience'
  //               render={({ field }) => (
  //                 <InputNumber
  //                   className='px-3  w-full outline-none   focus:border-gray-500 focus:shawdow-sm rounded-sm'
  //                   placeholder='Số năm kinh nghiệm'
  //                   classNameInput='rounded-xl border-2 w-full h-10 text-left pl-2 hover:shadow-black hover:shadow-sm'
  //                   errorMessage={errors.experience?.message}
  //                   {...field}
  //                   onChange={field.onChange}
  //                 />
  //               )}
  //             />
  //           </div>
  //         </div>
  //         <div className='flex flex-col'>
  //           <label className='block text-sm font-medium'>Môn học</label>
  //           <select
  //             {...register('subject')}
  //             className='ml-10 w-[20rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
  //           >
  //             <option value=''>Chọn môn học</option>
  //             <option value='Ngữ văn'>Ngữ văn</option>
  //             <option value='Toán học'>Toán học</option>
  //             <option value='Vật lý'>Vật lý</option>
  //             <option value='Hóa học'>Hóa học</option>
  //             <option value='Sinh học'>Sinh học</option>
  //             <option value='Lịch sử'>Lịch sử</option>
  //             <option value='Địa lý'>Địa lý</option>
  //             <option value='Giáo dục công dân'>Giáo dục công dân</option>
  //             <option value='Ngoại ngữ'>Ngoại ngữ</option>
  //             <option value='Tin học'>Tin học</option>
  //           </select>
  //           {errors.subject && (
  //             <p className='text-red-600 mt-1 text-[0.75rem]'>
  //               {errors.subject.message}
  //             </p>
  //           )}
  //         </div>
  //         {/* <div className='flex flex-col'>
  //           <label className='block text-sm font-medium'>Loại</label>
  //           <select
  //             {...register('type')}
  //             className='ml-10 w-[20rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
  //           >
  //             <option value=''>Chọn loại</option>
  //             <option value='Bằng Cấp'>Bằng Cấp</option>
  //             <option value='Chứng Chỉ'>Chứng Chỉ</option>
  //           </select>
  //           {errors.type && (
  //             <p className='text-red-600 mt-1 text-[0.75rem]'>
  //               {errors.type.message}
  //             </p>
  //           )}
  //         </div> */}
  //         <div className='mt-3'>
  //           <button
  //             type='submit'
  //             className='w-full rounded-xl text-center bg-pink-300 py-4 px-2 uppercase text-white text-sm hover:bg-pink-600 flex justify-center items-center'
  //           >
  //             Đăng Ký
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //  </div>
  //)
}
