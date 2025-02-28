import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { moderatorApi } from '../../api/moderator.api'
import { tutorApi } from '../../api/tutor.api'
import Pagination from '../../components/Pagination'
import { roles } from '../../constant/roles'
import { tutorCurrent } from '../../constant/status.class'
import { AppContext } from '../../context/app.context'
import { Request } from '../../types/request.type'
import { JoinClassBody } from '../../types/user.request.type'
import { User } from '../../types/user.type'
import { getProfileFromLS } from '../../utils/auth'
import { path } from '../../constant/path'
import { Link, useNavigate } from 'react-router-dom'
import { TutorProfile } from '../../types/tutor.type'
import Button from '../../components/Button'

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
}

export default function RequestList() {
  const user: User = getProfileFromLS()

  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [completedClasses, setCompletedClasses] = useState<{
    [key: string]: boolean
  }>({})
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [searchClassId, setSearchClassId] = useState<string>('')

  const { data: requestData, refetch } = useQuery<Request[]>({
    queryKey: ['Request'],
    queryFn: () => tutorApi.viewRequest(profile?.id as string),
    placeholderData: keepPreviousData
  })

  const { data: profileTutor } = useQuery<TutorProfile>({
    queryKey: ['Account', profile?.id as string],
    queryFn: () => tutorApi.getProfileTT(profile?.id as string),
    enabled:
      profile?.roles.toLocaleLowerCase() === roles.tutor && !!profile?.id,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  })

  const tutorApprovedReMutation = useMutation({
    mutationFn: (body: JoinClassBody) => tutorApi.joinClass(body)
  })

  const handleAcceptClass = (requestId: string) => {
    if (!selectedClasses.includes(requestId)) {
      const request = requestData?.find((req) => req.idRequest === requestId)
      const tutorSubjects =
        profileTutor?.subjects.split(';').map((subject) => subject.trim()) ?? []

      if (request && !tutorSubjects.includes(request.subject)) {
        toast.error('Bạn không dạy môn học này. Không thể nhận lớp.')
        return
      }

      const joinClass = {
        requestId: requestId,
        id: profile?.id ? profile.id : user.id
      }

      tutorApprovedReMutation.mutate(joinClass, {
        onSuccess: (data) => {
          refetch()
          setSelectedClasses((prevSelectedClasses) => [
            ...prevSelectedClasses,
            requestId
          ])
          setCompletedClasses((prev) => ({ ...prev, [requestId]: true }))
          toast.success(data.data.message)
        },
        onError: (error) => {
          navigate(path.deposit)
        }
      })
    }
  }

  const handleDeleteRequest = (idReq: string) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa không?')
    if (isConfirmed) {
      deleteMutation.mutate(idReq)
    }
  }

  const deleteMutation = useMutation({
    mutationFn: (idReq: string) => moderatorApi.deleteRequest(idReq),
    onSuccess: () => {
      toast.success('Yêu cầu đã bị xóa')
      refetch() // Refresh the request list after deletion
    }
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (requestData) {
      console.log(requestData)
    }
  }, [requestData])

  const filteredItems =
    requestData?.filter(
      (data) =>
        data.subject.toLowerCase().includes(selectedSubject.toLowerCase()) &&
        data.idRequest?.toLowerCase().includes(searchClassId.toLowerCase())
    ) ?? []

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleCheckSubject = (subject: string) => {
    // Tách các môn học thành mảng và chuyển thành chữ thường
    const tutorSubjects =
      profileTutor?.subjects
        ?.split(';')
        .map((subject) => subject.trim().toLowerCase()) || []

    // Chuyển môn học trong data.subject về chữ thường
    const subjectToCheck = subject.trim().toLowerCase()

    // Kiểm tra xem gia sư có dạy môn học trong data.subject không
    return tutorSubjects.includes(subjectToCheck)
  }

  return (
    <div className='p-4'>
      <div className='flex justify-center mb-4'>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className='border border-gray-300 p-2 rounded-lg mr-2'
        >
          <option value=''>Tất cả môn học</option>
          {requestData &&
            Array.from(new Set(requestData.map((item) => item.subject))).map(
              (subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              )
            )}
        </select>
        <input
          type='text'
          placeholder='Tìm kiếm theo mã lớp'
          value={searchClassId}
          onChange={(e) => setSearchClassId(e.target.value)}
          className='border border-gray-300 p-2 rounded-lg'
        />
      </div>

      {currentItems.length === 0 && (
        <div className='text-center text-gray-600 font-bold mt-4'>
          Hiện tại chưa có yêu cầu nào
        </div>
      )}
      <div className='container grid grid-cols-1 md:grid-cols-2 gap-5'>
        {currentItems.map((data, index) => (
          <div
            key={data.idRequest || `${data.subject}-${data.class}-${index}`}
            className='col-span-1'
          >
            <div className='max-w-35rem h-auto rounded-3xl mx-5 my-5 px-5 hover:shadow-2xl hover:shadow-black border border-gray-300'>
              <div className='my-2'>
                <h2 className='text-red-600 text-2xl'>{data.title}</h2>
              </div>
              <div className='text-[1rem] text-left'>
                <div>
                  Mã Lớp:{' '}
                  <span className='text-blue-500 font-bold text-md'>
                    {data.idRequest}
                  </span>
                </div>
                <div>
                  Môn dạy:{' '}
                  <span className='text-blue-500 font-bold text-md'>
                    {data.subject}
                  </span>
                </div>
                <div className='my-1'>
                  Lớp dạy:{' '}
                  <span className='text-blue-500 font-bold text-md'>
                    {data.class}
                  </span>
                </div>
                <div className='my-1'>
                  Giá tiền(1 buổi):{' '}
                  <span className='text-red-400 font-bold text-md'>
                    {formatCurrency(Number(data.price || 0))}
                  </span>
                </div>
                <div className='my-1'>
                  Ngày học:{' '}
                  <span className='text-black font-bold text-md'>
                    {data.timeTable}
                  </span>
                </div>
                <div className='my-1'>
                  Thời gian bắt đầu:{' '}
                  <span className='text-black font-bold text-md'>
                    {data.timeStart}
                  </span>
                </div>
                <div className='my-1'>
                  Thời gian kết thúc{' '}
                  <span className='text-black font-bold text-md'>
                    {data.timeEnd}
                  </span>
                </div>
                <div className='my-1'>
                  Hình thức:{' '}
                  <span className='text-black font-bold text-md'>
                    {data.learningMethod}
                  </span>
                </div>
                <div className='my-1'>
                  Mô tả:{' '}
                  <span className='text-black font-bold text-md'>
                    {data.description}
                  </span>
                </div>
              </div>
              <div className='w-full items-end flex'>
                <div className='my-4 w-full px-auto mx-auto'>
                  {user?.roles.toLowerCase() === roles.tutor &&
                    user.id !== data.id &&
                    handleCheckSubject(data.subject) && (
                      <div
                        onClick={() => handleAcceptClass(data.idRequest)}
                        role='button'
                        className={`rounded-lg w-full h-10 mx-auto justify-center items-center flex ${
                          completedClasses[data.idRequest] ||
                          data.current?.toLowerCase() ===
                            tutorCurrent.complete.toLowerCase()
                            ? 'bg-gray-500 cursor-not-allowed text-white'
                            : 'bg-pink-400 hover:opacity-80'
                        }`}
                        style={{
                          pointerEvents: completedClasses[data.idRequest]
                            ? 'none'
                            : 'auto'
                        }}
                      >
                        {completedClasses[data.idRequest] ||
                        data.current?.toLowerCase() ===
                          tutorCurrent.complete.toLowerCase()
                          ? 'Đã nhận lớp'
                          : 'Nhận Lớp'}
                      </div>
                    )}
                  {user.id === data.id && (
                    <Button className='w-full rounded-lg h-10 bg-gray-700 mx-auto text-white justify-center items-center flex'>
                      Đây là lớp của bạn
                    </Button>
                  )}

                  {user?.roles.toLowerCase() === roles.student &&
                    user.id !== data.id && (
                      <Link
                        to={path.registerAsTutor}
                        className='w-full h-10 bg-gray-300 mx-auto justify-center items-center flex rounded-lg'
                      >
                        Bạn phải là gia sư
                      </Link>
                    )}
                  {user?.roles.toLowerCase() === roles.tutor &&
                    user.id !== data.id &&
                    !handleCheckSubject(data.subject) && (
                      <Link
                        to={path.registerAsTutor}
                        className='w-full h-10 bg-gray-700 mx-auto text-white justify-center items-center flex rounded-lg'
                      >
                        Bạn không phải là gia sư của môn học này
                      </Link>
                    )}
                </div>
              </div>
              {user?.roles.toLowerCase() === roles.moderator && (
                <div className='flex justify-end mt-2'>
                  <div
                    onClick={() => handleDeleteRequest(data.idRequest!)}
                    role='button'
                    className='bg-red-700 text-white px-4 py-2 rounded-md w-full hover:bg-slate-600 hover:shadow-xl hover:shadow-black mb-2'
                  >
                    Xóa
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Pagination
        totalItems={filteredItems.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
