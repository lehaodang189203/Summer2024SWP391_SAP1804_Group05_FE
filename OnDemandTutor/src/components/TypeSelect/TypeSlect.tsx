
import { useState, useEffect } from 'react'

interface Props {
  onChange?: (value: string) => void
  value: string
  errorMessage?: string
}

export default function TypeSelect({ value,onChange, errorMessage }: Props) {
  const [type, setType] = useState('')

  

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setType(value)
    onChange && onChange(value)
  }

  return (
    <div className='flex flex-wrap flex-col content-center'>
      <select
        onChange={handleChange}
        className='h-10 rounded-md border w-[300px] border-black/10 px-3 cursor-pointer hover:border-black'
        value={type}
      >
        <option value=''>Loại</option>
        <option value='cetificate'>Chứng Chỉ</option>
        <option value='bangCap'>Bằng Cấp</option>
      </select>
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>
        {errorMessage}
      </div>
    </div>
  )
}
