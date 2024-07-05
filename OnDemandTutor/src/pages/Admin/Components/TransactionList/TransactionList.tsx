import { Button, Modal, Table, TableColumnsType, Tooltip } from "antd";
import TransactionMenu from "../AdminMenu/TransactionMenu";
import Search from "antd/es/transfer/search";
import { useEffect, useState } from "react";
import { RequestModerator } from "../../../../types/request.type";
import { adminAPI } from "../../../../api/admin.api";
import { useQuery } from "@tanstack/react-query";
import { SuccessResponseReq } from "../../../../types/utils.type";

export default function TransactionList() {
    // Lấy danh sách yêu cầu từ API
  const { data: tranData, refetch } = useQuery<any>({
    queryKey: ['Request'],
    queryFn: () => adminAPI.getTransaction()
  });

  // Chuyển đổi dữ liệu từ API, kiểm tra tranData có tồn tại không trước khi map
  const transformedData = tranData?.map((transaction: any) => ({
    idTran: transaction.id,
    createDate: transaction.createDate,
    status: transaction.status,
    amount: transaction.amount,
    userId: transaction.user.id,
    email: transaction.user.email,
    fullName: transaction.user.fullName,
    phone: transaction.user.phone,
    role: transaction.user.roles,
    address:transaction.user.address
  })) || [];
  console.log('transformedData',transformedData)
  // Hiển thị dữ liệu trong bảng
  useEffect(() => {
    if (tranData) {
      console.log(tranData);
    }
  }, [tranData]);

  const columns: TableColumnsType<any> = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'idTran',
      render: (text) => (
        <Tooltip title={text}>
          {text.length > 20 ? `${text.slice(0, 20)}...` : text}
        </Tooltip>
      ),
      onFilter: (value, record) =>
        record.fullName.indexOf(value as string) === 0,
      sorter: (a, b) => a.fullName.length - b.fullName.length,
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
      render: (text) => (
        <Tooltip title={text}>
          {text.length > 20 ? `${text.slice(0, 20)}...` : text}
        </Tooltip>
      ),
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
      title: '',
      dataIndex: 'role',
      width: 150
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: 150
    }
  ];

  const onChange = () => {} // Placeholder for future implementation

  
    return ( <>
        <div className='text-left'>Danh sách giao dịch</div>
        <TransactionMenu
            list='list'
            req=''
            app=''
            rej=''
           />
        <div className='text-left shadow-sm shadow-black border-4 pt-5 h-[629px] rounded-t-xl mt-6'>
          <div className='mb-5'>
            <Search />
          </div>
          <Table
            columns={columns}
            dataSource={transformedData}
            pagination={{ pageSize: 10 }}
            onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
            scroll={{ x: 1300, y: 400 }}
          />
          {/* <Modal
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
                      {selectedRecord.timeTable} <br />
                    </span>
                    Số ngày học:{' '}
                    <span className='line-under'>
                      {selectedRecord.totalSessions} <br />
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
          </Modal> */}
        </div>
        </> );
}
