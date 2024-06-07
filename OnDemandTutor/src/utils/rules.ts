import * as yup from 'yup'
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
export const schema = yup.object({
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
  firstname: yup
    .string()
    .min(2, 'tên phải có ít nhất 2 ký tự')
    .max(50, 'tên không được vượt quá 50 ký tự')
    .required('tên là bắt buộc'),

  lastname: yup
    .string()
    .min(2, 'Họ phải có ít nhất 2 ký tự')
    .max(50, 'Họ không được vượt quá 50 ký tự')
    .required('Họ là bắt buộc'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài là 1000 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  date_of_birth: yup
    .date()
    .max(new Date(), 'Hãy chọn một ngày trong quá khứ')
    .required('Nhập ngày, tháng, năm sinh là bắt buộc'),
  gender: yup
    .string()
<<<<<<< HEAD
    .required('Số điện thoại là bắt buộc')
    .matches(phoneFormat, 'Số điện thoại không hợp lệ'),
  gender:yup
    .string(),
  birthDate: yup
    .string()
    .required('Phải Nhập ngày tháng năm sinh')
=======
    .oneOf(
      ['male', 'female', 'other'],
      'Gender must be either male, female, or other'
    )
    .required('Gender is required')
>>>>>>> refs/remotes/origin/main
})

// này là mình export cái schema (đinhj dạng lỗi) của mình ra để qua bên Input bắt lỗi
export type Schema = yup.InferType<typeof schema>
