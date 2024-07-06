import { Link } from 'react-router-dom'
import { path } from '../../constant/path'
import { roles } from '../../constant/roles'

interface UserButtonProps {
  isAuthenticated: boolean
  profile: any
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
}

export default function UserButton({
  isAuthenticated,
  profile
}: UserButtonProps) {
  const renderButton = () => {
    if (profile?.roles === roles.admin) {
      // return (
      //   // <div className='border-2 px-auto py-auto mt-2 mr-10 rounded-md justify-center items-center flex font-medium'>
      //   //   <Link to={path.Admin.admin}>
      //   //     <span>Quản trị viên</span>
      //   //   </Link>
      //   // </div>
      // )
    } else if (profile?.roles === roles.moderator) {
      // return (
      //   // <div className='border-2 px-auto py-auto mt-2 mr-10 rounded-md justify-center items-center flex font-medium'>
      //   //   <Link to={path.Moderator.mod}>
      //   //     <span>Điều hành viên</span>
      //   //   </Link>
      //   // </div>
      // )
    } else {
      return (
        <div className='border-2 px-auto py-auto mt-2 mr-10 rounded-md justify-center items-center flex font-medium'>
          <Link to={path.deposit}>
            <span>Số dư:</span> {formatCurrency(profile?.accountBalance || 0)}
          </Link>
        </div>
      )
    }
  }

  return isAuthenticated ? renderButton() : null
}
