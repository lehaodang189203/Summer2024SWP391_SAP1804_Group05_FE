
import React, { useState } from 'react'

/*
Tháng trong dữ liệu nó bắt đầu bằng số 0 nha fen =))


*/

interface Props {
  onChange?: (value: string) => void
  value: string
  errorMessage?: string
}
export default function GenderSelect({ value, onChange, errorMessage }: Props) {
  const [gender, setGender] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setGender(value)

    // Gọi hàm onChange với giá trị giới tính mới
    onChange && onChange(value)
  }

  return (
    <div className='flex flex-wrap flex-col  '>
      <div className='pt-3 mb-2 text-left text-gray-400 text-sm'>Giới tính</div>
      <select
        onChange={handleChange}
        className='h-10 w-full rounded-md border border-black/10 px-3 cursor-pointer hover:border-black'
        value={gender}
      >
        <option value='male'>Nam</option>
        <option value='female'>Nữ</option>
      </select>
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>
        {errorMessage}
      </div>
    </div>
  )
}
