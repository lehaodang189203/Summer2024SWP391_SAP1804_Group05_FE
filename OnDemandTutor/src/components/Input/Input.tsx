import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  placeholer?: string

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
  rules,
  register,
  classNameInput = 'p-3 w-[300px] outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  hover:border-black border-2',
  classNameError = 'text-start ml-[10px] mt-1 text-red-600 min-h-[1.25rem]  w-full text-[11px]',
  placeholder,
  ...rest // phần còn lại
}: Props) {
  // thằng này dùng để check coi là user v
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
        placeholder={placeholder}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
