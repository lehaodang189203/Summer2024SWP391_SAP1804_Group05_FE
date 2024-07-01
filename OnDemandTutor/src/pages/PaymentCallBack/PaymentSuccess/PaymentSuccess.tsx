import { Link } from 'react-router-dom'
import { path } from '../../../constant/path'

export default function PaymentSuccess() {
  return (
    <div>
      <Link to={path.home} className='hover:text-red-400 font-medium'>
        Bạn đã nạp tiền thành công,Nhấn vào để quay lại trang chính
      </Link>
    </div>
  )
}
