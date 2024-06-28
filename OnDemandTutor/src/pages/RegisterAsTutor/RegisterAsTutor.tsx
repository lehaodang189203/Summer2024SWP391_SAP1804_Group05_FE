import { useState, useRef } from 'react'
import { studentApi } from '../../api/student.api'
import { useMutation } from '@tanstack/react-query'
import { RequestTutorBody } from '../../types/user.request.type'
import { toast } from 'react-toastify'
import InputFile from '../../components/InputFile'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { storage } from '../../utils/firebase'

export default function RegisterAsTutor() {
  const [file, setFile] = useState<File | null>(null)
  const [experience, setExperience] = useState<number | null>(null)
  const [imageQualification, setImageQualification] = useState<string>('')
  const [introduction, setIntroduction] = useState<string>('')
  const [qualificationName, setQualificationName] = useState<string>('')
  const [specializedSkills, setSpecializedSkills] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [type, setType] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const ReqMutation = useMutation({
    mutationFn: (body: RequestTutorBody) => studentApi.registerAsTutor(body)
  })

  const handleChangeFile = (file?: File) => {
    setFile(file || null)
  }

  const uploadAvatar = async (file: File): Promise<string> => {
    console.log(12111)

    const imageRef = ref(storage, `certificate/${file.name + uuidv4()}`)
    const snapshot = await uploadBytes(imageRef, file)
    const url = await getDownloadURL(snapshot.ref)
    return url
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !experience ||
      !introduction ||
      !qualificationName ||
      !specializedSkills ||
      !subject ||
      !type
    ) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    try {
      if (file) {
        console.log(file)

        const url = await uploadAvatar(file)
        console.log(url)

        setImageQualification(url) // Set the URL in the state
        setFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }

      const formData: RequestTutorBody = {
        experience: experience!,
        imageQualification,
        introduction,
        qualificationName,
        specializedSkills,
        subject,
        type
      }

      console.log('formData', formData)
      ReqMutation.mutate(formData, {
        onSuccess: () => {
          toast.success('Đơn của bạn đang chờ để xét duyệt')
        },
        onError: (error) => {
          toast.error('thất bại')
          toast.error(error.message)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' flex items-center justify-center bg-black bg-opacity-50'>
      <div className='p-6'>
        <form
          onSubmit={handleSubmit}
          className='w-[50rem] space-y-4 border-2 rounded-xl p-4 bg-white shadow-black shadow-lg'
        >
          <div className='space-y-2'>
            <label className='block'>
              Experience:
              <input
                type='number'
                value={experience || ''}
                onChange={(e) => setExperience(Number(e.target.value))}
                className='w-full p-2 border rounded'
                required
              />
            </label>

            <label className='block'>
              Introduction:
              <input
                type='text'
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                className='w-full p-2 border rounded'
                required
              />
            </label>
            <label className='block'>
              Qualification Name:
              <input
                type='text'
                value={qualificationName}
                onChange={(e) => setQualificationName(e.target.value)}
                className='w-full p-2 border rounded'
                required
              />
            </label>
            <label className='block'>
              Specialized Skills:
              <input
                type='text'
                value={specializedSkills}
                onChange={(e) => setSpecializedSkills(e.target.value)}
                className='w-full p-2 border rounded'
                required
              />
            </label>
            <label className='block'>
              Subject:
              <input
                type='text'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className='w-full p-2 border rounded'
                required
              />
            </label>
            <label className='block'>
              Type:
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='w-full p-2 border rounded'
                required
              >
                <option value=''>-- Chọn loại --</option>
                <option value='Chứng chỉ'>Chứng chỉ</option>
                <option value='Bằng Cấp'>Bằng Cấp</option>
              </select>
            </label>

            <div>
              <label htmlFor=''>Hãy chọn ảnh chứng chỉ</label>

              <InputFile onChange={handleChangeFile} />
            </div>
            <div>
              <img src={imageQualification} />
            </div>
          </div>
          <div className='mt-6 flex justify-around'>
            <div className='w-[49%]'>
              <button
                type='submit'
                className='w-full p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-300 focus:outline-none'
              >
                Nộp
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
