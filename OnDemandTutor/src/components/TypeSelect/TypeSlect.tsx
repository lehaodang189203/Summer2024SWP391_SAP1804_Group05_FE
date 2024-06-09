
import { useState } from 'react'


interface Props {
  value: string
  errorMessage?: string
}
export default function TypeSelect({ value, errorMessage }: Props) {
  const [type, setType] = useState('')

  const submit = () =>{
    setType(value)
  }

  return (
    <div className='flex flex-wrap flex-col  '>
      <select
        onChange={submit}
        className='h-10 w-full rounded-md border border-black/10 px-3 cursor-pointer hover:border-black'
        value={type}
      >
        <option value=''>Chọn xếp loại bằng</option>
        <option value='male'>Giỏi</option>
        <option value='female'>Khá</option>
        <option value='other'>Trung Bình</option>
      </select>
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>
        {errorMessage}
      </div>
    </div>
  )
}
