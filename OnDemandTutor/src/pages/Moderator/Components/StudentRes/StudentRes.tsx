import Search from "antd/es/transfer/search";
import ModMenu from "../ModMenu/ModMenu";
import { useState } from "react";
import { Button, Modal, Table, TableColumnsType } from "antd";
interface DataType {
    AccountID: string,
    FullName:string;
    SubjectName: string,
    title: string,
    price: 0,
    description: string,
    status: string,
    methodLearning: string,
    nameService: string,
    date: string,
    timeStart: string,
    timeEnd: string
}
const data = Array.from({ length: 10 }, (_, index) => ({
    AccountID: "21",
    FullName:"Ngô hoàng Khánh Hưng",
    SubjectName: "Toán",
    title: "Toán Kinh Tế",
    price: 0,
    description: "Áp dụng toán học vào lĩnh vực kinh tế và tài chính.",
    status: "đang hoạt động",
    methodLearning: "trực tuyến",
    nameService: "Lớp Toán Kinh Tế",
    date: "2024-06-15",
    timeStart: "18:00",
    timeEnd: "19:00"
  }))
function StudentRes() {
    const columns: TableColumnsType<DataType> = [{// định nghĩa từng cột
        title: "Tên Học Sinh", // tên của cột hay còn gọi là header của cột
        dataIndex: "FullName",// xác định trường nào trong interface DataType
        onFilter: (value, record) => record.FullName.indexOf(value as string) === 0,
        sorter: (a, b) => a.FullName.length - b.FullName.length,
        width:200,
        fixed:'left'
      }
      ,{
        title:"Môn",
        dataIndex:"SubjectName",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.SubjectName.length - b.SubjectName.length,
        width:200,
        // sorter: (a, b) => new Date(a.SubjectName).getTime() - new Date(b.SubjectName).getTime()
      },{
        title:"Mục",
        dataIndex:"title",
        // sorter: (a, b) => parseInt(a.Gender) - parseInt(b.Gender),
        width:200
      },{
        title:"Giá",
        dataIndex:"price",
        // defaultSortOrder: "descend",
        width:150,
        
        sorter: (a, b) => a.price - b.price
      },{
        title:"Trạng Thái",
        dataIndex:"status",
        // defaultSortOrder: "descend",
        // sorter: (a, b) => (a.status - b.status)
        width:200,
      },{
        title:"Phương thức học",
        dataIndex:"methodLearning",
        // defaultSortOrder: "descend"
        width:150,
      },{
        title:"Tên dịch vụ",
        dataIndex:"nameService",
        // defaultSortOrder: "descend"
        width:200,
      },{
        title:"Ngày",
        dataIndex:"date",
        // defaultSortOrder: "descend"
        width:150,
      },{
        title:"Giờ bắt đầu",
        dataIndex:"timeStart",
        // defaultSortOrder: "descend"
        width:150,
      },{
        title:"Giờ kết thúc",
        dataIndex:"date",
        // defaultSortOrder: "descend"
        width:150
      },
      {
        title: "Detail",
        dataIndex: "detail",
        fixed : 'right',
        className: "TextAlign",
        width:100,
        render: (text: string, record: DataType) => (<div className="flex gap-1">
          <button className="p-1 border border-red-500 rounded-lg hover:bg-red-500 active:bg-red-700"
          onClick={() => showDetail(record)}
          >Chi tiết</button></div>
        ),
      }
    ]
    const onChange = () =>{};// chưa bk làm dì
    // const [searchText, setSearchText] = useState('');// liên quan đến giá trị input vào search
    const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
    const [visible, setVisible] = useState(false);
    const showDetail = (record: DataType) => {
        setSelectedRecord(record);
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
        setSelectedRecord(null);
    };
    return ( <>
        <div className="text-left">Yêu cầu đặt lịch</div>
        <ModMenu
            kind="student"
            style="Option1"
        />
        <div className="text-left border-r-black border-l-black border-t-black border-2 pt-5 h-[629px] rounded-t-xl mt-6">
            <div className="mb-5">
                        <Search
                        // inputText={searchText}
                        // placeHolder="Search đi nè"
                        // setInputValue={setSearchText}
                        // label="Q"
                        />
            </div>
            <Table
                className=""
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }} 
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
                scroll={{ x: 1300,y: 400}}
                />
                <div>
                <Modal
                    title="Chi tiết"
                    visible={visible}
                    onCancel={handleCancel}
                    footer={[
                    <Button key="back" onClick={handleCancel}>
                        Xác nhận
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Từ chối
                    </Button>,
                    ]}
                    >
                    {selectedRecord && (
                    <div>
                        <p> Tên : {selectedRecord.FullName}</p>
                        <div className="flex">
                          <p>{selectedRecord.date} Thời gian: từ {selectedRecord.timeStart} tới { selectedRecord.timeEnd } </p>
                        </div>
                        <p>{selectedRecord.SubjectName}</p>
                    </div>
                    )}
                </Modal>
                </div> 
        </div>

        </> );
}

export default StudentRes;