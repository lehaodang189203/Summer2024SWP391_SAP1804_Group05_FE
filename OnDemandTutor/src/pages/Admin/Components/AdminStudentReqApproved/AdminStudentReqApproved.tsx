import Search from 'antd/es/transfer/search'

import { useQuery } from '@tanstack/react-query'
import { Modal, Table, TableColumnsType } from 'antd'
import { useEffect, useState } from 'react'
import { adminAPI } from '../../../../api/admin.api'
import { RequestModerator } from '../../../../types/request.type'
import StudentMenu from '../AdminMenu/StudentMenu/StudentMenu'

export default function AdminStudentReqApproved() {
  // Lấy danh sách yêu cầu từ API
  const { data: RequestAppData, refetch } = useQuery<RequestModerator[]>({
    queryKey: ['Request'],
    queryFn: () => adminAPI.getStudentReqApproved()
  })

  useEffect(() => {
    if (RequestAppData) {
      console.log(RequestAppData)
    }
  }, [RequestAppData])

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
            onClick={() => {
              console.log(record)
              showDetail(record.idRequest)
            }} // Ensure the id is passed correctly
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
    const record = RequestAppData?.find((item) => item.idRequest === id) || null
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
      <StudentMenu list='' req='' app='app' rej='' />
      <div className='text-left shadow-sm shadow-black border-4 pt-5 h-[629px] rounded-t-xl mt-6'>
        <div className='mb-5'>
          <Search />
        </div>
        <Table
          columns={columns}
          dataSource={RequestAppData}
          pagination={{ pageSize: 10 }}
          onChange={onChange}
          showSorterTooltip={{ target: 'sorter-icon' }}
          scroll={{ x: 1300, y: 400 }}
        />
        <Modal
          title={selectedRecord?.title}
          open={visible}
          onCancel={handleCancel}
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
                  <br />
                  Phương thức học:{' '}
                  <span className='line-under'>
                    {selectedRecord.learningMethod}
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
