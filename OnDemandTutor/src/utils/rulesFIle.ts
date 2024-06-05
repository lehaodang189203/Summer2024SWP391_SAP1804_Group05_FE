
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
export const schemaFile = yup.object({
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
    .required(' ')
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
    .string().required().oneOf(['Nam', 'Nữ', 'Khác'], 'Giới tính là bắt buộc'),
  birthDay: yup
    .string()
    .required('Phải Nhập ngày tháng năm sinh'),
  file: yup.mixed()
    .required('Up file để có thể đăng kí làm gia sư')
    .test('fileSize', 'Phải up File jpeg hoặc png hoặc pdf và bé hơn 10mb', (value) => {
      if (value instanceof FileList) {
        return value[0] && value[0].size <= 10000000; // 10MB
      }
      return false; //sai nếu như value không phải là FileList
    })
    .test('fileType', 'Chỉ hỗ trợ định dạng jpeg, png, pdf', (value) => {
      if (value instanceof FileList) {
        return value[0] && ['image/jpeg', 'image/png', 'application/pdf'].includes(value[0].type);
      }
      return false; // sai nếu như value không phải là FileList
    })
})

// này là mình export cái schema (đinhj dạng lỗi) của mình ra để qua bên Input bắt lỗi
export type SchemaFile = yup.InferType<typeof schemaFile>
