import React, { InputHTMLAttributes, ReactHTMLElement, useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameInput2?: string
  classNameError?: string
  placeholer?: string
  type?: string; // Chỉ định các loại input mà component hỗ trợ
  // tại sao lại any chỗ này?
  // đây là kỹ thuật dùng generic (tự tìm hỉu đi fen =)) )
  // do là UseFormRegister nó cần 1 cái typeFile mà mình chưa biết truyềnlên là gì

  // nên là minh để any, sau này minhf biết thì mình sửa =))

  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  errorMessage,
  className,
  name,
  type,
  rules,
  register,
  classNameInput = 'p-3 w-[300px] outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  hover:border-black border-2',
  classNameInput2 = 'p-3 w-[150px] outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  hover:border-black border-2',
  classNameError = 'text-start ml-[10px] mt-1 text-red-600 min-h-[1.25rem]  w-full text-[11px]',
  placeholder,
  ...rest // phần còn lại
}: Props) {
  // thằng này dùng để check coi là user v
  const registerResult = register && name ? register(name, rules) : {}
    
    const [fileName, setFileName] = useState('Chưa có file nào được chọn');
    const [fileLabel, setFileLabel] = useState('Chọn File');
    const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files;
      console.log(file)
      console.log('input')
      if (file) {
        setFileName('ccc');
        setFileLabel('Đã Chọn');
      } else {
        setFileName('Chưa có file nào được chọn');
        setFileLabel('Chọn File');
      }
    };//thành Nguyễn
  return (
    <div className={className}>
      {type === 'file' ? (
        <>
          {/* <input
            
            type='file'
            className='hidden'
            onChange={handleFileChange}
            {...registerResult}
            {...rest}
          /> */}
          <label className={''}>
            <div className='flex'> 
              <div className='p-4 rounded-s-md cursor-pointer border border-slate-500 hover:bg-slate-400'>{fileLabel}</div>
              <div className='bg-slate-300 p-4 '> {fileName} </div>
              
            </div>
         
            <input
              
              type="file"
              className="hidden file:"
              onChange={handleFileChange}
              {...registerResult}
              {...rest}
            />
          </label>
          
        </>
      ) : (
        <input
          //  tại sao bị như z
          // nó bị overwritte
          // name='email'
          type={type}
          className={
            placeholder === 'Họ' || placeholder === 'Tên'
              ? classNameInput2
              : classNameInput
          }
          {...registerResult}
          {...rest}
          placeholder={placeholder}
        />
      )}
      <div className={classNameError}>{errorMessage}</div>
    </div>
    
  )
}
