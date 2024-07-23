import { Link } from 'react-router-dom'
import { path } from '../../constant/path'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react'
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query'
import userApi from '../../api/user.api'
import { Notificate, User } from '../../types/user.type'
import { notifiReq } from '../../constant/notifi.req'
import { toast } from 'react-toastify'
import { roles } from '../../constant/roles'

interface UserButtonProps {
  isAuthenticated: boolean
  profile: User
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
}

export default function UserButton({
  profile,
  isAuthenticated
}: UserButtonProps) {
  const [showNotificationWindow, setShowNotificationWindow] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState<Notificate[]>(
    []
  )
  const notificationRef = useRef<HTMLDivElement>(null)
  const isFetchingRef = useRef(false)

  const { data: notifi, refetch }: UseQueryResult<Notificate[], Error> =
    useQuery({
      queryKey: ['notification'],
      queryFn: () => userApi.getNotification(profile.id as string),
      enabled: !!profile.id
    })

  useEffect(() => {
    // Filter unread notifications and update state
    if (notifi) {
      const filteredUnread = notifi.filter(
        (notification) => notification.status.toLowerCase() === notifiReq.unRead
      )
      setUnreadNotifications(filteredUnread)
    }
  }, [notifi])

  // Update all unread notifications for the user
  const updateNotifications = useMutation({
    mutationFn: (profileId: string) => userApi.updateNotification(profileId),
    onSuccess: () => {
      // Trigger refetch to update the notifications
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const hasNotification = unreadNotifications.length > 0

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setShowNotificationWindow(false)
      // Update all unread notifications when clicking outside
      if (isAuthenticated && !isFetchingRef.current) {
        isFetchingRef.current = true
        updateNotifications.mutate(profile.id, {
          onSettled: () => {
            isFetchingRef.current = false
          }
        })
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      refetch()
    } else {
      setUnreadNotifications([])
    }
  }, [isAuthenticated, profile.id, refetch])

  useEffect(() => {
    if (showNotificationWindow) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotificationWindow])

  const toggleNotificationWindow = () => {
    setShowNotificationWindow(!showNotificationWindow)
  }

  return (
    isAuthenticated && (
      <div className='flex ml-auto justify-end ml-90'>
        <div className='px-auto mb-2 mr-10 rounded-md justify-center items-center flex font-medium'>
          <Link to={path.deposit}>
            <span>Số dư:</span>{' '}
            {formatCurrency(Number(profile?.accountBalance) || 0)}
          </Link>
        </div>
        {profile.roles.toLowerCase() !== roles.moderator.toLowerCase() &&
          profile.roles !== roles.admin && (
            <div className='relative mx-4 mb-2'>
              <FontAwesomeIcon
                icon={faBell}
                className={`cursor-pointer ${
                  hasNotification ? 'text-red-600' : ''
                }`}
                onClick={toggleNotificationWindow}
              />
              {hasNotification && (
                <span className='absolute bottom-6 left-2 right-0 w-2 h-2 bg-red-600 rounded-full'></span>
              )}
              {showNotificationWindow && (
                <div
                  ref={notificationRef}
                  className='absolute right-0 mt-8 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50'
                >
                  <div className='p-4'>
                    <h3 className='text-lg font-medium'>Thông báo</h3>
                    <ul className='max-h-72 overflow-y-auto'>
                      {unreadNotifications.length > 0 ? (
                        unreadNotifications.map((notification, index) => (
                          <li
                            key={notification.idNotification}
                            className='py-2 border-b border-gray-200 hover:text-pink-400'
                          >
                            {index + 1}. {notification.description}
                          </li>
                        ))
                      ) : (
                        <li className='py-2'>Không có thông báo mới</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    )
  )
}
