// import React, { InputHTMLAttributes, useState } from 'react'
// import { RegisterOptions, UseFormRegister } from 'react-hook-form'

// interface Props extends InputHTMLAttributes<HTMLInputElement> {
//   errorMessage?: string
//   classNameInput?: string
//   classNameInput2?: string
//   classNameError?: string
//   placeholer?: string
//   type?: string // Chỉ định các loại input mà component hỗ trợ
//   // tại sao lại any chỗ này?
//   // đây là kỹ thuật dùng generic (tự tìm hỉu đi fen =)) )
//   // do là UseFormRegister nó cần 1 cái typeFile mà mình chưa biết truyềnlên là gì

//   // nên là minh để any, sau này minhf biết thì mình sửa =))

//   register?: UseFormRegister<any>
//   rules?: RegisterOptions
// }

// export default function Input({
//   errorMessage,
//   className,
//   name,
//   type,
//   rules,
//   register,
//   classNameInput = 'p-3 w-[300px] outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  ',
//   classNameInput2 = 'p-3 w-[150px] outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  hover:border-black border-2',
//   classNameError = 'text-start ml-[10px] mt-1 text-red-600 min-h-[1.25rem]  w-full text-[11px]',
//   placeholder,
//   ...rest // phần còn lại
// }: Props) {
//   // thằng này dùng để check coi là user v
//   const registerResult = register && name ? register(name, rules) : {}
//   const [fileName, setFileName] = React.useState<string>(
//     'Chưa có file nào được chọn'
//   ) //thành Nguyễn
//   const [fileLabel, setLabel] = useState<String>('Chọn File')
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLabel('Đã Chọn')
//     const file = event.target.files
//     if (file && file.length > 0) {
//       setFileName(file[0].name)
//     } else {
//       setFileName('Chưa có file nào được chọn')
//     }
//   } //thành Nguyễn
//   return (
//     <div className={className}>
//       {type === 'file' ? (
//         <>
//           {/* <input

//             type='file'
//             className='hidden'
//             onChange={handleFileChange}
//             {...registerResult}
//             {...rest}
//           /> */}
//           <label className={''}>
//             <div className='flex'>
//               <div className='p-4 rounded-s-md cursor-pointer border border-slate-500 hover:bg-slate-400'>
//                 {fileLabel}
//               </div>
//               <div className='bg-slate-300 p-4 '> {fileName} </div>
//             </div>

//             <input
//               type='file'
//               className='hidden'
//               onChange={handleFileChange}
//               {...registerResult}
//               {...rest}
//             />
//           </label>
//         </>
//       ) : (
//         <input
//           //  tại sao bị như z
//           // nó bị overwritte
//           // name='email'
//           type={type}
//           className={
//             placeholder === 'Họ' || placeholder === 'Tên'
//               ? classNameInput2
//               : classNameInput
//           }
//           {...registerResult}
//           {...rest}
//           placeholder={placeholder}
//         />
//       )}
//       <div className={classNameError}>{errorMessage}</div>
//     </div>
//   )
// }

//----------------------------------------------------------------------------
import { InputHTMLAttributes, useState } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  placeholer?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameEye?: string
}

export default function Input({
  errorMessage,
  className,
  name,
  rules,
  register,
  classNameInput = 'p-3 w-[300px] outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  ',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  classNameEye = 'absolute top-[8px] right-[5px] h-5 w-5 cursor-pointer',
  placeholder,
  ...rest
}: Props) {
  const [openEye, setOpenEye] = useState(false)

  const toggleEye = () => {
    setOpenEye((prev) => !prev)
  }

  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        //  tại sao bị như z
        // nó bị overwritte
        // name='email'
        className={classNameInput}
        {...registerResult}
        {...rest}
        // nêu mà cái type là password và con mắt đóng thì là password
        type={rest.type === 'password' && !openEye ? 'password' : 'text'}
        placeholder={placeholder}
      />
      {/*  mắt mở và mắt nhắm */}
      {rest.type === 'password' && openEye && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className={classNameEye}
          onClick={toggleEye}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
          />
        </svg>
      )}

      {rest.type === 'password' && !openEye && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className={classNameEye}
          onClick={toggleEye}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
          />
        </svg>
      )}
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
