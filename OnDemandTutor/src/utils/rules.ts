import * as yup from 'yup'

function testDate(this: yup.TestContext<yup.AnyObject>) {
  const { timeStart, timeEnd } = this.parent as {
    timeStart: string
    timeEnd: string
  }
  if (timeStart && timeEnd) {
    const start = new Date(`1970-01-01T${timeStart}:00Z`) // Adding reference date
    const end = new Date(`1970-01-01T${timeEnd}:00Z`) // Adding reference date

    return start < end
  }
  return timeStart === '' || timeEnd === ''
}

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Độ dài từ 6-160 ký tự')
    .max(160, 'Độ dài từ 6-160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại mật khẩu không khớp ')
}

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

  phone: yup
    .string()
    .max(20, 'Độ dài tối đa là 20 ký tự')
    .required('Số điện thoại là bắt buộc'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  gender: yup.string().oneOf(['male', 'female']),
  amount: yup.number().required('Số tiền nạp là bắt buộc'),

  fullName: yup
    .string()
    .max(160, 'Độ dài tối đa là 160 ký tự')
    .required('Họ và tên là bắt buộc')
})

export const userSchema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .min(5, 'Độ dài từ 5-160 ký tự')
    .max(160, 'Độ dài từ 5-160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: handleConfirmPasswordYup('new_password'),
  gender: yup.string().oneOf(['male', 'female']),
  fullName: yup
    .string()
    .max(160, 'Độ dài tối đa là 160 ký tự')
    .required('Họ và tên là bắt buộc')
})

export const requestSchema = yup.object({
  title: yup.string().required('Tựa đề là bắt buộc'),
  date: yup
    .string()
    .required('Ngày học là bắt buộc')
    .test('is-future-date', 'Ngày học không được ở trong quá khứ', (value) => {
      const selectedDate = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Set time to the start of the day
      return selectedDate >= today
    }),
  LearningMethod: yup
    .string()
    .oneOf(
      ['Dạy trực tiếp(offline)', 'Dạy trực tuyến (online)'],
      'Phương thức học không hợp lệ'
    )
    .required('Hãy chọn phương thức học'),
  class: yup.string().oneOf(['10', '11', '12']).required('Chọn lớp'),
  price: yup
    .number()
    .required('Giá là bắt buộc')
    .positive('Giá không thể là số âm'),
  subject: yup
    .string()
    .required('Môn học là bắt buộc')
    .oneOf(
      [
        'Ngữ văn',
        'Toán học',
        'Vật lý',
        'Hóa học',
        'Sinh học',
        'Lịch sử',
        'Địa lý',
        'Giáo dục công dân',
        'Ngoại ngữ',
        'Tin học'
      ],
      'Môn học không hợp lệ'
    ),
  timeEnd: yup.string().required('Thời gian kết thúc là bắt buộc').test({
    name: 'time-not-allowed',
    message: 'thời gian không phù hợp',
    test: testDate
  }),
  timeStart: yup.string().required('Thời gian bắt đầu là bắt buộc').test({
    name: 'time-not-allowed',
    message: 'thời gian không phù hợp',
    test: testDate
  }),
  description: yup
    .string()
    .required('Mô tả là bắt buộc')
    .max(1000, 'Độ dài tối đa 1000 ký tự')
})
export type RequiredSchema = yup.InferType<typeof requestSchema>
export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
