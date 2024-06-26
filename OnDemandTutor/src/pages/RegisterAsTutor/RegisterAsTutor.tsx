import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { SchemaResAT, schemaResAT } from '../../utils/rules'

import InputNumber from '../../components/InputNumber'
import Input from '../../components/Input'
import { useRef, useState } from 'react'
import InputFile from '../../components/InputFile'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../utils/firebase'
import { v4 } from 'uuid'
type FormData = Pick<
  SchemaResAT,
  | 'experience'
  | 'subject'
  | 'imageQualification'
  | 'qualificationName'
  | 'specializedSkills'
  | 'type'
  | 'introduction'
>

const registerATSchema = schemaResAT.pick([
  'experience',
  'subject',
  'imageQualification',
  'qualificationName',
  'specializedSkills',
  'type',
  'introduction'
])

export default function RegisterAsTuTor() {
  // const [urlImage, setUrlImage] = useState<string | null>(null)
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   setError,
  //   watch,
  //   formState: { errors }
  // } = useForm<FormData>({
  //   resolver: yupResolver(registerATSchema)
  // })
  // // const avatar = watch('avatar')
  // // console.log('avatar', avatar)
  // const uploadAvatar = async (file: File): Promise<string> => {
  //   const imageRef = ref(storage, `avatarUser/${file.name + v4()}`)
  //   const snapshot = await uploadBytes(imageRef, file)
  //   const url = await getDownloadURL(snapshot.ref)
  //   return url
  // }
  // const onSubmit = handleSubmit(async (data: FormData) => {
  //   console.log(data)
  //   try {
  //     if (file) {
  //       const url = await uploadAvatar(file)
  //       console.log('url', url)
  //       setUrlImage(url)
  //       //  setValue('avatar', url) // Update the avatar URL in form data
  //       setFile(null)
  //       if (fileInputRef.current) {
  //         fileInputRef.current.value = ''
  //       }
  //     }
  //     const res = {
  //       ...data
  //       //avatar: watch('avatar') // Ensure the form data has the updated avatar URL
  //     }
  //     console.log('11111111111')
  //     console.log('res', res)
  //     // const updateRes = await updateProfileMutation.mutateAsync(res, {
  //     //   onSuccess: (data) => {
  //     //     toast.success(data.data.message)
  //     //     setProfile(data.data.data)
  //     //     setProfileToLS(data.data.data)
  //     //     refetch()
  //     //   },
  //     //   onError: (error) => {
  //     //     toast.error(error.message)
  //     //     console.error(error)
  //     //   }
  //     // })
  //     // console.log(updateRes)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })
  // const [file, setFile] = useState<File | null>(null)
  // const fileInputRef = useRef<HTMLInputElement | null>(null)
  // const handleChangeFile = (file?: File) => {
  //   setFile(file || null)
  // }
  // return (
  // <div className='py-10 w-[25rem] rounded-2xl border-2 mx-auto my-[2rem] bg-transparent hover:shadow-xl hover:shadow-black'>
  //   <div className='container mx-auto justify-center flex'>
  //     <form onSubmit={onSubmit}>
  //       <div className='text-2xl'>Đăng Ký Trở thành gia sư</div>
  //       <Input
  //         name='qualificationName'
  //         type='text'
  //         placeholder='Tên chứng chỉ'
  //         className='mt-8'
  //         register={register}
  //         errorMessage={errors.qualificationName?.message}
  //       />
  //       <div className=' mt-2 flex flex-wrap flex-col sm:flex-row '>
  //         <div className='sm:w-[80%]  sm:pl-5'>
  //           <Controller
  //             control={control}
  //             name='experience'
  //             render={({ field }) => (
  //               <InputNumber
  //                 className='px-3  w-[18rem] outline-none   focus:border-gray-500 focus:shawdow-sm rounded-sm'
  //                 placeholder='Số năm kinh nghiệm'
  //                 classNameInput='rounded-xl border-2 w-full h-10 text-left pl-2 hover:shadow-black hover:shadow-sm'
  //                 errorMessage={errors.experience?.message}
  //                 {...field}
  //                 onChange={field.onChange}
  //               />
  //             )}
  //           />
  //         </div>
  //       </div>
  //       <div className='flex flex-col'>
  //         <label className='block text-sm font-medium'>Môn học</label>
  //         <select
  //           {...register('subject')}
  //           className='ml-10 w-[18rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
  //         >
  //           <option value=''>Chọn môn học</option>
  //           <option value='Ngữ văn'>Ngữ văn</option>
  //           <option value='Toán học'>Toán học</option>
  //           <option value='Vật lý'>Vật lý</option>
  //           <option value='Hóa học'>Hóa học</option>
  //           <option value='Sinh học'>Sinh học</option>
  //           <option value='Lịch sử'>Lịch sử</option>
  //           <option value='Địa lý'>Địa lý</option>
  //           <option value='Giáo dục công dân'>Giáo dục công dân</option>
  //           <option value='Ngoại ngữ'>Ngoại ngữ</option>
  //           <option value='Tin học'>Tin học</option>
  //         </select>
  //         {errors.subject && (
  //           <p className='text-red-600 mt-1 text-[0.75rem]'>
  //             {errors.subject.message}
  //           </p>
  //         )}
  //       </div>
  //       <div className='flex flex-col'>
  //         <label className='block text-sm font-medium'>Loại</label>
  //         <select
  //           {...register('type')}
  //           className='ml-10 w-[18rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
  //         >
  //           <option value=''>Chọn loại</option>
  //           <option value='Bằng Cấp'>Bằng Cấp</option>
  //           <option value='Chứng Chỉ'>Chứng Chỉ</option>
  //         </select>
  //         {errors.type && (
  //           <p className='text-red-600 mt-1 text-[0.75rem]'>
  //             {errors.type.message}
  //           </p>
  //         )}
  //       </div>
  //       <Input
  //         name='introduction'
  //         type='text'
  //         placeholder='Giới thiệu bản thân'
  //         className='mt-8'
  //         register={register}
  //         errorMessage={errors.introduction?.message}
  //       />
  //       <Input
  //         name='specializedSkills'
  //         type='text'
  //         placeholder='Kỹ năng chuyên môn'
  //         className='mt-8'
  //         register={register}
  //         errorMessage={errors.specializedSkills?.message}
  //       />
  //       <div>
  //         <label htmlFor=''>Chọn ảnh chứng chí</label>
  //         <InputFile onChange={handleChangeFile} />
  //       </div>
  //       <div className='mt-3'>
  //         <button
  //           type='submit'
  //           className='w-full rounded-xl text-center bg-pink-300 py-4 px-2 uppercase text-white text-sm hover:bg-pink-600 flex justify-center items-center'
  //         >
  //           Đăng Ký
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // </div>
  // )
}
