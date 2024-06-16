import React, { InputHTMLAttributes, useState } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  placeholer?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameEye?: string
  type?: string
}
export default function InputFile({
  errorMessage,
  className,
  name,
  type,
  rules,
  register,
  classNameInput = 'p-3 w-[300px] outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  ',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  placeholder,
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  const [fileName, setFileName] = useState<string>('Chưa có file nào được chọn')
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files

    if (file && file.length > 0) {
      setFileName(file[0].name)
      console.log(file[0].name)
    } else {
      setFileName('file null')
    }
  }
  return (
    <div className={className}>
      {type === 'file' ? (
        <>
          <label className={''}>
            <div className='flex'>
              <div className='content-center w-[100px] rounded-s-md cursor-pointer border border-slate-500 hover:bg-slate-400'>
                Chọn File
              </div>
              <div className=' bg-slate-400 w-[200px] rounded-e-md content-cente'>
                <p className='p-4'> {fileName} </p>
              </div>
            </div>

            <input
              type='file'
              className='hidden'
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
              ? classNameInput
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
  // return (

  // )
}
// import React, { InputHTMLAttributes, useState } from "react";
// import { RegisterOptions, UseFormRegister } from "react-hook-form";

// interface Props extends InputHTMLAttributes<HTMLInputElement> {
//   className?: string;
//   classNameError?: string;
//   errorMessage?: string;
//   inputText?: string;
//   fileNameText?: string;
//   classNameInput?: string;
//   register?: UseFormRegister<any>;
//   rules?: RegisterOptions;
// }

// const InputFile: React.FC<Props> = ({
//   errorMessage,
//   className = '',
//   classNameInput = '',
//   classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
//   fileNameText = 'Chưa có file nào được chọn',
//   inputText = 'Chọn File',
//   register,
//   onChange,
//   rules,
//   ...rest
// }) => {
//   // const [fileName, setFileName] = useState<string>(fileNameText);

//   // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = event.target.files;
//   //   if (file && file.length > 0) {
//   //     setFileName(file[0].name);
//   //   } else {
//   //     setFileName(fileNameText);
//   //   }
//   // };
//   const [fileName, setFileName] = React.useState<string>(
//     'Chưa có file nào được chọn'
//   )
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

//        const file = event.target.files
//        if (file && file.length > 0) {
//          setFileName(file[0].name)
//        } else {
//          setFileName('Chưa có file nào được chọn')
//        }
//        if (onChange) {
//         onChange(event);
//       }
//      }
//   return (
//     <div className={className}>
//       <label className="flex items-center cursor-pointer">
//         <div className="p-4 h-20 rounded-s-md border border-slate-500 hover:bg-slate-400">
//           {inputText}
//         </div>
//         <div className="bg-slate-400 h-20 w-full rounded-e-md flex items-center pl-4">
//           <p>{fileName}</p>
//         </div>
//         <input
//           type="file"
//           className={`hidden ${classNameInput}`}
//           onChange={handleFileChange}
//           {...(register ? register(rest.name as string, rules) : {})}
//           {...rest}
//         />
//       </label>
//       {errorMessage && <div className={classNameError}>{errorMessage}</div>}
//     </div>
//   );
// };

// export default InputFile;
// import React, { InputHTMLAttributes, useState } from "react";
// import { RegisterOptions, UseFormRegister } from "react-hook-form";

// interface Props extends InputHTMLAttributes<HTMLInputElement> {
//   className?: string;
//   classNameError?: string;
//   errorMessage?: string;
//   inputText?: string;
//   fileNameText?: string;
//   classNameInput?: string;
//   register?: UseFormRegister<any>;
//   rules?: RegisterOptions;
// }

// const InputFile: React.FC<Props> = ({
//   errorMessage,
//   className = '',
//   classNameInput = '',
//   classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
//   fileNameText = 'Chưa có file nào được chọn',
//   inputText = 'Chọn File',
//   register,
//   rules,
//   onChange,
//   ...rest
// }) => {
//   const [fileName, setFileName] = useState<string>(fileNameText);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files;
//     if (file && file.length > 0) {
//       setFileName(file[0].name);
//     } else {
//       setFileName(fileNameText);
//     }
//     if (onChange) {
//       onChange(event);
//     }
//   };

//   return (
//     <div className={className}>
//       <label className="flex items-center cursor-pointer">
//         <div className="p-4 h-20 rounded-s-md border border-slate-500 hover:bg-slate-400">
//           {inputText}
//         </div>
//         <div className="bg-slate-400 h-20 w-full rounded-e-md flex items-center pl-4">
//           <p>{fileName}</p>
//         </div>
//         <input
//           type="file"
//           className={`hidden ${classNameInput}`}
//           onChange={handleFileChange}
//           {...(register ? register(rest.name as string, rules) : {})}
//           {...rest}
//         />
//       </label>
//       {errorMessage && <div className={classNameError}>{errorMessage}</div>}
//     </div>
//   );
// };

// export default InputFile;
// import React, { Fragment, useRef } from 'react'
// import config from '../../constant/config'
// import { toast } from 'react-toastify'
// interface Props {
//   onChange?: (file?: File) => void
// }

// export default function InputFile({ onChange }: Props) {
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // này là 1 cái file list mà chúng ta lấy thì chỉ lấy có 1 file thôi nên là items (0)
//     const fileformLocal = event.target.files?.[0]
//     if (
//       fileformLocal &&
//       (fileformLocal?.size >= config.maxSizeUpLoadAvatar ||
//         !fileformLocal.type.includes('image'))
//     ) {
//       toast.error(
//         'Vui lòng chọn ảnh có dung lượng nhỏ hơn 1MB và phải là ảnh',
//         {
//           position: 'top-center'
//         }
//       )
//       return
//     }
//     onChange && onChange(fileformLocal)
//   }

//   const handleUpload = () => {
//     fileInputRef.current?.click()
//   }
//   return (
//     <div>
//       <Fragment>
//         <input
//           className='hidden'
//           type='file'
//           accept='jpg,.jeg,.png'
//           ref={fileInputRef}
//           onChange={onFileChange}
//           onClick={(event) => {
//             ;(event.target as any).value = null
//           }}
//         />
//         <button
//           onClick={handleUpload}
//           type='button'
//           className='flex h-10 items-center justify-end rounded-sm bg-white px-6 text-sm text-gray-600 shadow-sm'
//         >
//           Chọn ảnh
//         </button>
//       </Fragment>
//     </div>
//   )
// }
