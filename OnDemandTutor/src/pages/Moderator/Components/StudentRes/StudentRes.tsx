import Search from 'antd/es/transfer/search'
import ModMenu from '../ModMenu/ModMenu'
import { useEffect, useState } from 'react'
import { Button, Modal, Table, TableColumnsType } from 'antd'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { studentApi } from '../../../../api/student.api'
export interface DataType {
  id: string
  fullName: string
  subject: string
  title: string
  price: 0
  description: string
  class: string
  learningMethod: string
  date: string
  timeStart: string
  timeEnd: string
}

// const data = Array.from({ length: 10 }, (_, index) => ({
//   id: '21',
//   fullName: 'Ngô hoàng Khánh Hưng',
//   subject: 'Toán',
//   title: 'Toán Kinh Tế',
//   price: 0,
//   description: 'Áp dụng toán học vào lĩnh vực kinh tế và tài chính.',

//   methodLearning: 'trực tuyến',

//   date: '2024-06-15',
//   timeStart: '18:00',
//   timeEnd: '19:00'
// }))

export default function StudentRes() {
  //  đây là lấy danh sách xuống
  // const { data: RequestData } = useQuery<DataType[]>({
  //   queryKey: ['Request'],
  //   queryFn: () => studentApi.getRequest() // Use the modified function
  // })
  // useEffect(() => {
  //   if (RequestData) {
  //     console.log(RequestData)
  //   }
  // }, [RequestData])
  // const handleApprove = () => {
  // }
  // const columns: TableColumnsType<DataType> = [
  //   {
  //     // định nghĩa từng cột
  //     title: 'Tên Học Sinh', // tên của cột hay còn gọi là header của cột
  //     dataIndex: 'fullName', // xác định trường nào trong interface DataType
  //     onFilter: (value, record) =>
  //       record.fullName.indexOf(value as string) === 0,
  //     sorter: (a, b) => a.fullName.length - b.fullName.length,
  //     width: 200,
  //     fixed: 'left'
  //   },
  //   {
  //     title: 'Môn',
  //     dataIndex: 'SubjectName',
  //     defaultSortOrder: 'descend',
  //     // sorter: (a, b) => a.subject.length - b.subject.length,
  //     width: 200
  //     // sorter: (a, b) => new Date(a.SubjectName).getTime() - new Date(b.SubjectName).getTime()
  //   },
  //   {
  //     title: 'Mục',
  //     dataIndex: 'title',
  //     // sorter: (a, b) => parseInt(a.Gender) - parseInt(b.Gender),
  //     width: 200
  //   },
  //   {
  //     title: 'Giá',
  //     dataIndex: 'price',
  //     // defaultSortOrder: "descend"
  //     width: 150,
  //     sorter: (a, b) => a.price - b.price
  //   },
  //   {
  //     title: 'Phương thức học',
  //     dataIndex: 'learningMethod',
  //     // defaultSortOrder: "descend"
  //     width: 150
  //   },
  //   {
  //     title: 'Ngày',
  //     dataIndex: 'date',
  //     // defaultSortOrder: "descend"
  //     width: 150
  //   },
  //   {
  //     title: 'Giờ bắt đầu',
  //     dataIndex: 'timeStart',
  //     // defaultSortOrder: "descend"
  //     width: 150
  //   },
  //   {
  //     title: 'Giờ kết thúc',
  //     dataIndex: 'timeEnd',
  //     // defaultSortOrder: "descend"
  //     width: 150
  //   },
  //   {
  //     title: 'Detail',
  //     dataIndex: 'detail',
  //     fixed: 'right',
  //     className: 'TextAlign',
  //     width: 100,
  //     render: (text: string, record: DataType) => (
  //       <div className='flex gap-1'>
  //         <button
  //           className='p-1 border border-red-500 rounded-lg hover:bg-red-500 active:bg-red-700'
  //           onClick={() => showDetail(record)} //data của nguyên cả cái hàng là record
  //         >
  //           Chi tiết
  //         </button>
  //       </div>
  //     )
  //   }
  // ]
  // const onChange = () => {} // chưa bk làm dì
  // // const [searchText, setSearchText] = useState('');// liên quan đến giá trị input vào search
  // const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null)
  // const [visible, setVisible] = useState(false)
  // const showDetail = (record: DataType) => {
  //   setSelectedRecord(record)
  //   setVisible(true)
  // }
  // const handleCancel = () => {
  //   setVisible(false)
  //   setSelectedRecord(null)
  // }
  // return (
  //   <>
  //     <div className='text-left'>Yêu cầu đặt lịch</div>
  //     <ModMenu kind='student' style='Option1' />
  //     <div className='text-left shadow-2xl shadow-black border-4 pt-5 h-[629px] rounded-t-xl mt-6'>
  //       <div className='mb-5'>
  //         <Search
  //         // inputText={searchText}
  //         // placeHolder="Search đi nè"
  //         // setInputValue={setSearchText}
  //         // label="Q"
  //         />
  //       </div>
  //       <Table
  //         className=''
  //         columns={columns}
  //         dataSource={RequestData}
  //         pagination={{ pageSize: 10 }}
  //         onChange={onChange}
  //         showSorterTooltip={{ target: 'sorter-icon' }}
  //         scroll={{ x: 1300, y: 400 }}
  //       />
  //       <div>
  //         <Modal
  //           title='Chi tiết'
  //           visible={visible}
  //           onCancel={handleCancel}
  //           footer={[
  //             <Button key='back' onClick={handleCancel} onClick={handleApprove}>
  //               Xác nhận
  //             </Button>,
  //             <Button key='back' onClick={handleCancel}>
  //               Từ chối
  //             </Button>
  //           ]}
  //         >
  //           {selectedRecord && (
  //             <div>
  //               <p> Tên : {selectedRecord.fullName}</p>
  //               <div className='flex'>
  //                 <p>
  //                   {selectedRecord.date} Thời gian: từ{' '}
  //                   {selectedRecord.timeStart} tới {selectedRecord.timeEnd}{' '}
  //                   {selectedRecord.}
  //                 </p>
  //               </div>
  //               <p>{selectedRecord.subject}</p>
  //             </div>
  //           )}
  //         </Modal>
  //       </div>
  //     </div>
  //   </>
  // )
}
