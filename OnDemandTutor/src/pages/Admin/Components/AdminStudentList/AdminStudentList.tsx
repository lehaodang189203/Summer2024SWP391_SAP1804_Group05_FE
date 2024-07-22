import { useState } from 'react'
import { Button, Modal, Table, Input, TableColumnsType } from 'antd'
import Search from 'antd/es/transfer/search'
import StudentMenu from '../AdminMenu/StudentMenu/StudentMenu'
import { adminAPI } from '../../../../api/admin.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const { Search: AntdSearch } = Input

const onChange = () => {}

export default function AdminStudentList() {
  // Lấy danh sách học sinh
  const { data: StudentData, refetch } = useQuery<DataTypeStu[]>({
    queryKey: ['StudentList'],
    queryFn: () => adminAPI.getStudentList()
  })
  const [selectedRecord, setSelectedRecord] = useState<DataTypeStu | null>(null)
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState('')

  const showDetail = (record: DataTypeStu) => {
    setSelectedRecord(record)
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
    setSelectedRecord(null)
  }

  const removeMutation = useMutation({
    mutationFn: (idAccount: string) => adminAPI.deleteAccount(idAccount),
    onSuccess: () => {
      toast.success('Đã xóa tài khoản')
      refetch()
      setVisible(false)
    }
  })

  const handleDelete = () => {
    if (selectedRecord) {
      removeMutation.mutate(selectedRecord.id)
    }
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const filteredData =
    StudentData?.filter((student) =>
      student.fullName.toLowerCase().includes(searchText.toLowerCase())
    ) || []

  const columns: TableColumnsType<DataTypeStu> = [
    {
      title: 'Tên học sinh',
      dataIndex: 'fullName',
      defaultSortOrder: 'descend',
      onFilter: (value, record) =>
        record.fullName.indexOf(value as string) === 0,
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      width: 200,
      fixed: 'left'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      defaultSortOrder: 'descend',
      width: 200,
      sorter: (a, b) =>
        new Date(a.date_of_birth).getTime() -
        new Date(b.date_of_birth).getTime()
    },
    {
      title: 'Giới Tính',
      dataIndex: 'gender',
      sorter: (a, b) => parseInt(a.gender) - parseInt(b.gender),
      width: 200
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      width: 200
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200
    },
    {
      title: 'Chi tiết',
      dataIndex: 'detail',
      className: 'TextAlign',
      width: 100,
      render: (text: string, record: DataTypeStu) => (
        <div className='flex gap-1'>
          <button
            className='p-1 border text-black border-red-500 rounded-lg hover:bg-red-500 active:bg-red-700 '
            onClick={() => showDetail(record)}
          >
            Chi tiết
          </button>
        </div>
      ),
      fixed: 'right'
    }
  ]

  return (
    <>
      <div>
        <StudentMenu list='list' req='' app='' rej='' />
        <div className='text-left shadow-sm border-4 pt-5 h-[629px] rounded-t-xl mt-6'>
          <div className='mb-5 px-4 w-[full]'>
            <AntdSearch
              placeholder='Tìm kiếm theo tên học sinh'
              onSearch={handleSearch}
              enterButton
              className='w-full max-w-xs'
            />
          </div>
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 6 }}
            onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
            scroll={{ x: 1300, y: 400 }}
          />
        </div>
        <Modal
          title='Chi tiết'
          visible={visible}
          onCancel={handleCancel}
          footer={[
            <Button key='delete' type='primary' danger onClick={handleDelete}>
              Xóa
            </Button>
          ]}
        >
          {selectedRecord && (
            <div>
              <p>
                <strong>Tên:</strong>{' '}
                {selectedRecord.fullName || 'Chưa cập nhật'}
              </p>
              <p>
                <strong>ID:</strong> {selectedRecord.id || 'Chưa cập nhật'}
              </p>
              <p>
                <strong>Ngày sinh:</strong>{' '}
                {selectedRecord.date_of_birth || 'Chưa cập nhật'}
              </p>
              <p>
                <strong>Giới tính:</strong>{' '}
                {selectedRecord.gender || 'Chưa cập nhật'}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                {selectedRecord.email || 'Chưa cập nhật'}
              </p>
              <p>
                <strong>Số điện thoại:</strong>{' '}
                {selectedRecord.phone || 'Chưa cập nhật'}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </>
  )
}
