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
      }
      ,{
        title:"Môn",
        dataIndex:"SubjectName",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.SubjectName.length - b.SubjectName.length,
        // sorter: (a, b) => new Date(a.SubjectName).getTime() - new Date(b.SubjectName).getTime()
      },{
        title:"Mục",
        dataIndex:"title",
        // sorter: (a, b) => parseInt(a.Gender) - parseInt(b.Gender),
      },{
        title:"Giá",
        dataIndex:"price",
        // defaultSortOrder: "descend",
        
        sorter: (a, b) => a.price - b.price
      },{
        title:"Trạng Thái",
        dataIndex:"status",
        // defaultSortOrder: "descend",
        // sorter: (a, b) => (a.status - b.status)
      },{
        title:"Phương thức học",
        dataIndex:"methodLearning",
        // defaultSortOrder: "descend"
      },{
        title:"Tên dịch vụ",
        dataIndex:"nameService",
        // defaultSortOrder: "descend"
      },{
        title:"Ngày",
        dataIndex:"date",
        // defaultSortOrder: "descend"
      },{
        title:"Giờ bắt đầu",
        dataIndex:"timeStart",
        // defaultSortOrder: "descend"
      },{
        title:"Giờ kết thúc",
        dataIndex:"date",
        // defaultSortOrder: "descend"
      },
      {
        title: "Detail",
        dataIndex: "detail",
        className: "TextAlign",
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
            list="list"
            rej=""
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
                pagination={{ pageSize: 5 }} 
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
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
                        {/* <p> Ngày sinh : {selectedRecord.Date_Of_Birth}</p>
                         <p> Giới tính : {selectedRecord.Gender}</p>
                        <p> Môn : {selectedRecord.SubjectName}</p>
                        <p>Bằng cấp(Chứng chỉ) : {selectedRecord.Type}</p>
                        <p> Tên bằng Cấp : {selectedRecord.QualificationName}</p>
                        <p> Kĩ năng đặc biệt : {selectedRecord.SpecializedSkill}</p>
                     <img src={selectedRecord.Img}> : {selectedRecord.Img}</img>    // ảnh nè  
                        <p> Kinh nghiệm dạy : {selectedRecord.Experience} Năm</p>  */}
                    </div>
                    )}
                </Modal>
                </div> 
        </div>

        </> );
}

export default StudentRes;