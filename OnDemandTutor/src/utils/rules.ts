
import * as yup from "yup";
//npm i -D yup if dont work
//  này là mình xài yup của react hook form để làm validate nha fen
//

// type Rules = {
//   // chỗ này là sao?
//   //  có nghĩa là:
//   // chúng ta định dạng được lấy từ RegisterOptions trong react hookform
//   // bên trong thằng RegisterOptions này có các key hỗ trợ cho việc input
//   // chúng ta lấy mấy key đó ra xài để tránh gõ sai
//   [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
// }
const phoneFormat = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
export const schema = yup.object({
  username:yup
  .string()
  .required('User Name là bắt buộc'),
  email: yup
    .string()
    .required('Email là bắt buộc')
    .min(5, 'Độ dài từ 5-160 ký tự')
    .max(160, 'Độ dài từ 5-160 ký tự'),
  password: yup
    .string()
    .required('Mật Khẩu là bắt buộc')
    .min(6, 'Độ dài từ 6-160 ký tự')
    .max(160, 'Độ dài từ 6-160 ký tự'),
  confirm_password: yup
    .string()
    .required('Xác nhận mật khẩu là bắt buộc')
    .min(6, 'Độ dài từ 6-160 ký tự')
    .max(160, 'Độ dài từ 6-160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp'),
  firstName: yup
    .string()
    // .required('Xác nhận mật khẩu là bắt buộc')
    // .min(6, 'Độ dài từ 6-160 ký tự')
    .max(160, 'Độ dài từ 0-160 ký tự'),
  lastName: yup
    .string()
    .required('Tên là bắt buộc')
    .min(1, 'Độ dài từ 6-160 ký tự')
    .max(160, 'Độ dài từ 0-160 ký tự'),  
  hotline: yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .matches(phoneFormat, 'Số điện thoại không hợp lệ'),
  gender:yup
    .string(),
  birthDay: yup
    .string()
    .required('Phải Nhập ngày tháng năm sinh')
})

// này là mình export cái schema (đinhj dạng lỗi) của mình ra để qua bên Input bắt lỗi
export type Schema = yup.InferType<typeof schema>
