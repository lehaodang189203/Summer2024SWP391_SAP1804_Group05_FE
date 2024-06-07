import { Value } from 'classnames'
import { range } from 'lodash'
import React, { useEffect, useState } from 'react'

/*
Tháng trong dữ liệu nó bắt đầu bằng số 0 nha fen =))


*/

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}
export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0, // tháng 1
    year: value?.getFullYear() || 1990
  })

  // này làm cho nó đồng bộ thui giữa client vs local của mình thui
  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate() || 1,
        month: value?.getMonth() || 0,
        year: value?.getFullYear() || 1990
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Trích xuất giá trị và tên từ phần tử chọn đã kích hoạt sự kiện
    // do là khi mà mình nhấp á là mình phải có cái value vs lại cái name (name để xác định rõ là cái nào vừa thay đổi)
    const { value: valueFromSelect, name } = event.target

    // Tạo một đối tượng ngày mới với các giá trị cập nhật
    const newDate = {
      date: value?.getDate() || date.date, // Lấy ngày từ value hoặc giữ nguyên ngày 1
      month: value?.getMonth() || date.month, // Lấy tháng từ value hoặc giữ nguyên tháng 1
      year: value?.getFullYear() || date.year, // Lấy năm từ value hoặc giữ nguyên năm 1990
      // dữ liệu nó sẽ string nên tui convert thành số cho dễ xử lý nha fen
      [name]: Number(valueFromSelect) // Cập nhật giá trị mới từ phần tử chọn , name sẽ ghi đè lên phẩnf từ bị thay đổi
    }

    // Cập nhật trạng thái với đối tượng ngày mới
    setDate(newDate)

    // đọc là
    //  phải có onChange nha  (thay đổi)
    // có onChange thì tạo đối tượng dựa trên những cái có nha
    // Gọi hàm onChange với đối tượng Date mới nếu onChange được cung cấp
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='flex flex-wrap flex-col  '>
      <div className='pt-3 mb-2  text-left  text-gray-400 text-sm'>
        Ngày sinh
      </div>
      <div className=''>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='date'
            className='h-10 w-[32%] rounded-md border  border-black/10 px-3 cursor-pointer hover:border-black '
            value={value?.getDate() || date.date}
          >
            <option disabled>ngày</option>
            {/* raneg này của lodash nó , nó render từ 1 đến 31 */}
            {range(1, 32).map((item: any ) => ( // thêm any để chạy code
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='month'
            className='h-10 w-[32%] rounded-md  border border-black/10 px-3 cursor-pointer   hover:border-black '
            value={value?.getMonth() || date.month}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item: any) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='year'
            className='h-10 w-[32%] rounded-md  border border-black/10 px-3 cursor-pointer  hover:border-black  '
            value={value?.getFullYear() || date.year}
          >
            <option disabled>Năm</option>
            {range(1990, 2025).map((item: any) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>
          {errorMessage}
        </div>
      </div>
    </div>
  )
}
