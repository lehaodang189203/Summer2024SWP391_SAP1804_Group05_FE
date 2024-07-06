import { Link } from 'react-router-dom'
import { path } from '../../../constant/path'
import { useQuery } from '@tanstack/react-query'
import userApi from '../../../api/user.api'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../../context/app.context'
import { getProfileFromLS, setProfileToLS } from '../../../utils/auth'
import { User } from '../../../types/user.type'

const user: User = getProfileFromLS()

export default function PaymentSuccess() {
  const { profile, setProfile } = useContext(AppContext)
  const { data: ProfileData } = useQuery({
    queryKey: ['Account'],
    queryFn: () => userApi.getProfile(profile?.id as string)
  })
  useEffect(() => {
    setProfile(ProfileData ? ProfileData.data.data : profile)
    setProfileToLS(ProfileData ? ProfileData.data.data : user)
  })

  return (
    <div>
      <Link to={path.home} className='hover:text-red-400 font-medium'>
        Bạn đã nạp tiền thành công,Nhấn vào để quay lại trang chính
      </Link>
    </div>
  )
}
