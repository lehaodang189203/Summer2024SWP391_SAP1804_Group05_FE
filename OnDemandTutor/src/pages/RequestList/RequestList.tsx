import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { tutorApi } from '../../api/tutor.api'
import Pagination from '../../components/Pagination'
import { Request } from '../../types/request.type'
import { JoinClassBody } from '../../types/user.request.type'
import { User } from '../../types/user.type'
import { getProfileFromLS } from '../../utils/auth'
import FormRequest from '../FormRequest/FormRequest'

export default function RequestList() {
  const user: User = getProfileFromLS()

  const [selectedClasses, setSelectedClasses] = useState<string[]>([])

  const { data: RequestData } = useQuery<Request[]>({
    queryKey: ['Request'],
    queryFn: () => tutorApi.viewRequest(),
    placeholderData: keepPreviousData
  })

  const tutorAprrovedReMutation = useMutation({
    mutationFn: (body: JoinClassBody) => tutorApi.joinClass(body),
    onSuccess: (data, variables) => {
      setSelectedClasses((prevSelectedClasses) => [
        ...prevSelectedClasses,
        variables.idRequest
      ])
      toast.success(data.data.message)
    },
    onError: (data) => {
      toast.error(data.message)
    }
  })

  const handleAcceptClass = (requestId: string) => {
    if (!selectedClasses.includes(requestId)) {
      tutorAprrovedReMutation.mutate({ idRequest: requestId, id: user.id })
    }
  }

  useEffect(() => {
    if (RequestData) {
      console.log(RequestData)
    }
  }, [RequestData])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const items = RequestData || []
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage)

  const [showForm, setShowForm] = useState(false)

  const handleOpenPopup = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  return (
    <>
      <div className='container grid grid-cols-1 md:grid-cols-2 gap-5 h-[1000px]'>
        {currentItems
          .filter((data) => data.idRequest) // Ensure idrequest is not null or undefined
          .map((data, index) => (
            <div
              key={data.idRequest || `${data.subject}-${data.class}-${index}`}
              className='col-span-1'
            >
              <div className='w-[35rem] h-auto rounded-3xl mx-5 my-5 px-5 hover:shadow-2xl hover:shadow-black border border-gray-300'>
                <div className='my-2'>
                  <h2 className='text-red-600 text-2xl'>{data.title}</h2>
                </div>
                <div className='text-[1rem] text-left'>
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
                    Mức lương:{' '}
                    <span className='text-red-400 font-bold text-md'>
                      {data.price}
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
                    {user?.roles === 'gia sư' ? (
                      <div
                        role='button'
                        onClick={() => handleAcceptClass(data.idRequest)}
                        className={`rounded-lg w-full h-10 mx-auto justify-center items-center flex ${
                          selectedClasses.includes(data.idRequest!)
                            ? 'bg-gray-700 cursor-not-allowed'
                            : 'bg-pink-400 hover:opacity-80'
                        }`}
                        style={{
                          pointerEvents: selectedClasses.includes(
                            data.idRequest!
                          )
                            ? 'none'
                            : 'auto'
                        }}
                      >
                        {selectedClasses.includes(data.idRequest!)
                          ? 'Đã nhận lớp'
                          : 'Nhận Lớp'}
                      </div>
                    ) : (
                      <div className='w-full h-10 bg-gray-300 mx-auto justify-center items-center flex'>
                        Bạn phải là gia sư
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className='fixed bottom-6 right-6'>
        <button
          onClick={handleOpenPopup}
          className='mb-10 bg-slate-500 text-white rounded-full p-4 shadow-lg hover:bg-transparent transition-all duration-300 hover:text-black shadow-black hover: relative group'
        >
          +
          <span className='absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 w-[3rem] p-2 text-white bg-black rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            Bấm vào để tạo lớp
          </span>
        </button>
        {showForm && <FormRequest onClose={handleCloseForm} />}
      </div>

      <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}
