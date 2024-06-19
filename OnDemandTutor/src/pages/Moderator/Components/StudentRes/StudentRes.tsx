import Search from 'antd/es/transfer/search'
import ModMenu from '../ModMenu/ModMenu'
import { useEffect, useState } from 'react'
import { Button, Modal, Table, TableColumnsType } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import { moderatorApi } from '../../../../api/moderator.api'
import { toast } from 'react-toastify'
import { DataType } from '../../../../types/request.type'

export default function StudentRes() {
  // Lấy danh sách yêu cầu từ API
  const { data: RequestData, refetch } = useQuery<DataType[]>({
    queryKey: ['Request'],
    queryFn: () => moderatorApi.getRequest()
  })

  // Khởi tạo các mutation cho việc phê duyệt và từ chối yêu cầu
  const approveMutation = useMutation({
    mutationFn: (idReq: string) => moderatorApi.approvedRequest(idReq),
    onSuccess: () => {
      toast.success('Yêu cầu đã được phê duyệt')
      refetch() // Gọi lại API để cập nhật lại danh sách yêu cầu
      setVisible(false)
    }
  })

  const rejectMutation = useMutation({
    mutationFn: (idReq: string) => moderatorApi.rejectRequest(idReq),
    onSuccess: () => {
      toast.error('Yêu cầu đã bị từ chối')
      refetch() // Gọi lại API để cập nhật lại danh sách yêu cầu
      setVisible(false)
    }
  })

  useEffect(() => {
    if (RequestData) {
      console.log(RequestData)
    }
  }, [RequestData])

  const handleApprove = () => {
    if (selectedRecord) {
      approveMutation.mutate(selectedRecord.id)
    }
  }

  const handleReject = () => {
    if (selectedRecord) {
      rejectMutation.mutate(selectedRecord.id)
    }
  }

  const columns: TableColumnsType<DataType> = [
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
      title: 'Mục',
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
      dataIndex: 'date',
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
      render: (text: string, record: DataType) => (
        <div className='flex gap-1'>
          <button
            className='p-1 border border-red-500 rounded-lg hover:bg-red-500 active:bg-red-700'
            onClick={() => showDetail(record.id)}
          >
            Chi tiết
          </button>
        </div>
      )
    }
  ]

  const onChange = () => {} // Placeholder for future implementation

  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null)
  const [visible, setVisible] = useState(false)

  const showDetail = (id: string) => {
    const record = RequestData?.find((item) => item.id === id) || null
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
      <div className='text-left'>Yêu cầu đặt lịch</div>
      <ModMenu kind='student' style='Option1' />
      <div className='text-left shadow-2xl shadow-black border-4 pt-5 h-[629px] rounded-t-xl mt-6'>
        <div className='mb-5'>
          <Search />
        </div>
        <Table
          columns={columns}
          dataSource={RequestData}
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
              Xác nhận
            </Button>,
            <Button key='reject' onClick={handleReject}>
              Từ chối
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
                    {selectedRecord.date} <br />
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
            </div>
          )}
        </Modal>
      </div>
    </>
  )
}
