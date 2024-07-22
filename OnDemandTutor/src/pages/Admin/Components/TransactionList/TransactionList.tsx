import { Table, TableColumnsType, Tooltip } from 'antd'
import TransactionMenu from '../AdminMenu/TransactionMenu'
import { useState, useEffect } from 'react'
import { adminAPI } from '../../../../api/admin.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { TransData } from '../../../../types/chart.type'
import { TransType } from '../../../../types/user.type'

export default function TransactionList() {
  const [hasError, setHasError] = useState<boolean>(false)

  const {
    data: tranData = [],
    refetch,
    error
  } = useQuery<TransType[]>({
    queryKey: ['Request'],
    queryFn: () => adminAPI.getTransaction(),
    placeholderData: keepPreviousData
  })

  useEffect(() => {
    if (error) {
      refetch()
      setHasError(true)
    }
  }, [error, refetch])

  useEffect(() => {
    if (error) {
      refetch()
    }
  }, [error, refetch])

  const [searchText, setSearchText] = useState<string>('')

  const transformedData: TransData[] = Array.isArray(tranData)
    ? tranData?.map((transaction: any) => ({
        idTran: transaction.id,
        createDate: transaction.createDate,
        status: transaction.status,
        amount: transaction.amount,
        userId: transaction.user.id,
        email: transaction.user.email,
        fullName: transaction.user.fullName,
        phone: transaction.user.phone,
        role: transaction.user.roles,
        address: transaction.user.address
      }))
    : []

  const filteredData: TransData[] = transformedData.filter(
    (item: TransData) => {
      const searchTextLower = searchText.toLowerCase()
      return item.idTran.toLowerCase().includes(searchTextLower)
    }
  )

  const columns: TableColumnsType<any> = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'idTran',
      render: (text: string) =>
        text ? (
          <Tooltip title={text}>
            {text.length > 20 ? `${text.slice(0, 20)}...` : text}
          </Tooltip>
        ) : null,
      width: 200,
      fixed: 'left'
    },
    {
      title: 'Ngày giao dịch',
      dataIndex: 'createDate',
      defaultSortOrder: 'descend',
      width: 200
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 200
    },
    {
      title: 'Số tiền nạp',
      dataIndex: 'amount',
      width: 150
    },
    {
      title: 'Id người nạp',
      dataIndex: 'userId',
      render: (text: string) =>
        text ? (
          <Tooltip title={text}>
            {text.length > 20 ? `${text.slice(0, 20)}...` : text}
          </Tooltip>
        ) : null,
      width: 200
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 150
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      width: 150
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      width: 150
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: 150
    }
  ]

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const onChange = () => {}

  return (
    <>
      <TransactionMenu list='list' req='' app='' rej='' />
      <div className='px-auto shadow-sm shadow-black pt-5 h-[629px] rounded-t-xl mt-6'>
        <div className='mb-5 mx-auto'>
          <input
            type='text'
            className='w-[50rem] p-2 mx-auto'
            placeholder='Nhập mã giao dịch'
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          onChange={onChange}
          showSorterTooltip={{ target: 'sorter-icon' }}
          scroll={{ x: 1300, y: 400 }}
        />
      </div>
    </>
  )
}
