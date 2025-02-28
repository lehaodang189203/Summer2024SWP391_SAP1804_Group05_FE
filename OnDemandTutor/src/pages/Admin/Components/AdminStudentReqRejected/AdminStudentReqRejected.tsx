import Search from 'antd/es/transfer/search'

import { useEffect, useState } from 'react'
import { Button, Modal, Table, TableColumnsType } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import { moderatorApi } from '../../../../api/moderator.api'
import { toast } from 'react-toastify'
import StudentMenu from '../AdminMenu/StudentMenu/StudentMenu'
import { RequestModerator } from '../../../../types/request.type'
import { adminAPI } from '../../../../api/admin.api'

export default function AdminStudentReqRejected() {
  // Lấy danh sách yêu cầu từ API
  const { data: RequestRejData, refetch } = useQuery<RequestModerator[]>({
    queryKey: ['RequestRej'],
    queryFn: () => adminAPI.getStudentReqRejected()
  })

  // Khởi tạo các mutation cho việc phê duyệt và từ chối yêu cầu
  const approveMutation = useMutation({
    mutationFn: (idReq: string) => moderatorApi.approvedRequest(idReq),
    onSuccess: () => {
      toast.success('Yêu cầu đã được phê duyệt lại')
      refetch() // Gọi lại API để cập nhật lại danh sách yêu cầu
      setVisible(false)
    }
  })

  useEffect(() => {
    if (RequestRejData) {
      console.log(RequestRejData)
    }
  }, [RequestRejData])

  const handleApprove = () => {
    if (selectedRecord) {
      approveMutation.mutate(selectedRecord.idRequest)
      console.log('id của thằng request nè ', selectedRecord.idRequest)
    }
  }

  const columns: TableColumnsType<RequestModerator> = [
    {
      title: 'Tên Học Sinh',
      dataIndex: 'fullName',
      onFilter: (value, record) =>
        record.fullName.indexOf(value as string) === 0,
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      width: 200,
      fixed: 'left'
    },
    {
      title: 'Môn',
      dataIndex: 'subject',
      defaultSortOrder: 'descend',
      width: 200
    },
    {
      title: 'Tựa Đề',
      dataIndex: 'title',
      width: 200
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      width: 150,
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Phương thức học',
      dataIndex: 'learningMethod',
      width: 150
    },
    {
      title: 'Ngày',
      dataIndex: 'timeTable',
      width: 150
    },
    {
      title: 'Giờ bắt đầu',
      dataIndex: 'timeStart',
      width: 150
    },
    {
      title: 'Giờ kết thúc',
      dataIndex: 'timeEnd',
      width: 150
    },
    {
      title: 'Chi tiết',
      dataIndex: 'detail',
      fixed: 'right',
      className: 'TextAlign',
      width: 100,
      render: (text: string, record: RequestModerator) => (
        <div className='flex gap-1'>
          <button
            className='p-1 border border-red-500 rounded-lg hover:bg-red-500 active:bg-red-700'
            onClick={() => showDetail(record.idRequest)} // Ensure the id is passed correctly
          >
            Chi tiết
          </button>
        </div>
      )
    }
  ]

  const onChange = () => {} // Placeholder for future implementation

  const [selectedRecord, setSelectedRecord] = useState<RequestModerator | null>(
    null
  )
  const [visible, setVisible] = useState(false)

  const showDetail = (id: string) => {
    const record = RequestRejData?.find((item) => item.idRequest === id) || null
    console.log('id', id)
    setSelectedRecord(record)
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
    setSelectedRecord(null)
  }

  return (
    <>
      <StudentMenu list='' req='' app='' rej='rej' />
      <div className='text-left shadow-sm shadow-black border-4 pt-5 h-[629px] rounded-t-xl mt-6'>
        <div className='mb-5'>
          <Search />
        </div>
        <Table
          columns={columns}
          dataSource={RequestRejData}
          pagination={{ pageSize: 10 }}
          onChange={onChange}
          showSorterTooltip={{ target: 'sorter-icon' }}
          scroll={{ x: 1300, y: 400 }}
        />
        <Modal
          title='Chi tiết'
          visible={visible}
          onCancel={handleCancel}
          footer={[
            <Button key='approve' onClick={handleApprove}>
              Xác nhận lại vào hệ thống
            </Button>
          ]}
        >
          {selectedRecord && (
            <div>
              <p className='font-medium'>
                Tên: {''}
                <span className='font-bold text-pink-500'>
                  {selectedRecord.fullName}
                </span>
              </p>
              <div className='flex'>
                <p className='font-medium'>
                  Ngày học:{' '}
                  <span className='line-under'>
                    {selectedRecord.timeTable} <br />
                  </span>
                  Thời gian:{' '}
                  <span className='font-bold'>
                    từ {selectedRecord.timeStart} tới {selectedRecord.timeEnd}{' '}
                  </span>
                </p>
              </div>
              <p className='font-medium'>
                Môn học:
                <span className='text-blue-400'> {selectedRecord.subject}</span>
              </p>
              <p className='font-medium'>
                Học phí: {''}
                <span className='text-red-500'>{selectedRecord.price}</span>
              </p>

              <p className='font-medium'>
                Nguyên nhân: {''}
                <span className='text-red-500'>{selectedRecord.reason}</span>
              </p>
            </div>
          )}
        </Modal>
      </div>
    </>
  )
}
