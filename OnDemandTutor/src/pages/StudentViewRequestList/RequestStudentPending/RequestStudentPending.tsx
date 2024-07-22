import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Select, Input } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { studentApi } from '../../../api/student.api'
import Pagination from '../../../components/Pagination'
import { Request } from '../../../types/request.type'
import { AppContext } from '../../../context/app.context'
import RequestComponents from '../components/RequestComponents'

const { Option } = Select
const { Search } = Input

export function RequestStudentPending() {
  const { profile } = useContext(AppContext)

  // State for search filters
  const [searchId, setSearchId] = useState('')
  const [searchSubject, setSearchSubject] = useState<string | undefined>(
    undefined
  )
  const [searchMethod, setSearchMethod] = useState<string | undefined>(
    undefined
  )
  const [searchClassId, setSearchClassId] = useState<string>('')

  const fetchRequests = async () => {
    const requests = await studentApi.pendingRequest(profile?.id as string)

    return requests.filter((request) => {
      const matchesId = searchId ? request.idRequest.includes(searchId) : true
      const matchesSubject = searchSubject
        ? request.subject === searchSubject
        : true
      const matchesMethod = searchMethod
        ? request.learningMethod === searchMethod
        : true
      const matchesClassId = searchClassId
        ? request.idRequest.includes(searchClassId)
        : true
      return matchesId && matchesSubject && matchesMethod && matchesClassId
    })
  }

  const { data: RequestData, refetch } = useQuery<Request[]>({
    queryKey: ['Request', searchId, searchSubject, searchMethod, searchClassId],
    queryFn: fetchRequests,
    enabled: !!profile?.id,
    placeholderData: keepPreviousData
  })

  useEffect(() => {
    refetch()
  }, [searchId, searchSubject, searchMethod, searchClassId, refetch])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const items = RequestData || []
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className='bg-gray-200 w-full p-3'>
      <div className='flex px-auto justify-between mb-4  bg-slate-200'>
        <div className='flex gap-4 mx-auto'>
          <Input
            placeholder='Tìm kiếm theo mã lớp'
            value={searchClassId}
            onChange={(e) => setSearchClassId(e.target.value)}
            className='border border-gray-300 p-2 rounded-lg w-[20rem]'
          />
          <Select
            placeholder='Chọn môn học'
            value={searchSubject}
            onChange={(value) => setSearchSubject(value as string)}
            className='border border-gray-300 p-2 h-[3rem] rounded-lg w-64'
            style={{ width: 200 }}
          >
            <Option value=''>Tất cả môn học</Option>
            {RequestData &&
              Array.from(new Set(RequestData.map((item) => item.subject))).map(
                (subject) => (
                  <Option key={subject} value={subject}>
                    {subject}
                  </Option>
                )
              )}
          </Select>
          <Select
            placeholder='Chọn phương thức'
            value={searchMethod}
            onChange={(value) => setSearchMethod(value as string)}
            className='border border-gray-300 p-2 h-[3rem] rounded-lg w-64'
            style={{ width: 200 }}
          >
            <Option value=''>Tất cả phương thức</Option>
            {RequestData &&
              Array.from(
                new Set(RequestData.map((item) => item.learningMethod))
              ).map((method) => (
                <Option key={method} value={method}>
                  {method}
                </Option>
              ))}
          </Select>
        </div>
      </div>

      <div className='p-3'>
        <div className='flex justify-between font-bold mr-20 ml-32'>
          <div>Thông tin đơn</div>
          <div>Tình Trạng</div>
        </div>
        <div className='pt-5 bg-transparent rounded-lg around w-full'>
          {currentItems.length > 0 ? (
            currentItems.map((request) => (
              <RequestComponents
                key={request.idRequest}
                request={request}
                refetch={refetch}
              />
            ))
          ) : (
            <div className='text-center text-gray-500'>Bạn chưa có yêu cầu</div>
          )}
        </div>
      </div>
      <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
