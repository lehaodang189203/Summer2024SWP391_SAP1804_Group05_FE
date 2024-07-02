import { useState } from "react";
import { Button, Modal, Table, TableColumnsType} from "antd";
import Search from "antd/es/transfer/search";
import StudentMenu from "../AdminMenu/StudentMenu/StudentMenu";
interface DataTypeStu{
    id: string,
    fullName: string,
    phone: string,
    email: string,
    date_of_birth: string,
    gender: string,
    roles: string
    // statuses: string[];
}

const data = [
    {
        id: "21",
        fullName: "Nguyễn Trí Thành",
        date_of_birth: "2000-01-19",
        gender: "Nam",
        phone: "0899923213",
        roles: "Học sinh",
        email: "thanh@gmail.com"
    }
];
const onChange=( )=>{}
export default function AdminStudentList () {
    //const [searchText, setSearchText] = useState('');// liên quan đến giá trị input vào search
    const [selectedRecord, setSelectedRecord] = useState<DataTypeStu | null>(null);
    const [visible, setVisible] = useState(false);

    const showDetail = (record: DataTypeStu) => {
        setSelectedRecord(record);
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
        setSelectedRecord(null);
    };
    const columns: TableColumnsType<DataTypeStu> = [{// định nghĩa từng cột
        title: "Tên", // tên của cột hay còn gọi là header của cột
        dataIndex: "fullName",// xác định trường nào trong interface DataType
        defaultSortOrder: "descend",
        onFilter: (value, record) => record.fullName.indexOf(value as string) === 0,
        sorter: (a, b) => a.fullName.length - b.fullName.length,
        width:200,
        fixed:"left"
      }
      ,{
        title:"Ngày sinh",
        dataIndex:"date_of_birth",
        defaultSortOrder: "descend",
        width:200,
        sorter: (a, b) => new Date(a.date_of_birth).getTime() - new Date(b.date_of_birth).getTime()
      },{
        title:"Giới Tính",
        dataIndex:"gender",
        sorter: (a, b) => parseInt(a.gender) - parseInt(b.gender),
        width:200
      },{
        title:"Số điện thoại",
        dataIndex:"phone",
        //sorter: (a, b) => parseInt(a.gender) - parseInt(b.gender),
        width:200
      },{
        title:"Email",
        dataIndex:"email",
        //sorter: (a, b) => parseInt(a.gender) - parseInt(b.gender),
        width:200
      },
      {
        title: "Detail",
        dataIndex: "detail",
        className: "TextAlign",
        width:100,
        render: ( record: DataTypeStu) => (<div className="flex gap-1">
          <button className="p-1 border border-red-500 rounded-lg hover:bg-red-500 active:bg-red-700"
          onClick={() => showDetail(record)}
          >Chi tiết</button></div>
        ),
        fixed:"right"
      }
    ]
    return (<>
        <div>
            <div className="text-left ">Quản lí học sinh</div>
            <StudentMenu
            list="list"
            req=""
            app=""
            rej=""
            />
            <div className=" text-left border-2 p-5 h-[600px] rounded-t-xl shadow-black rounded-2xl shadow-sm mt-5">
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
                pagination={{ pageSize: 6 }} 
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
                scroll={{ x: 1300,y: 400}}
                />
            </div>
            <div>
                <Modal
                    title="Chi tiết"
                    visible={visible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Sửa
                        </Button>,
                        <Button key="back" onClick={handleCancel}>
                            Xóa
                        </Button>
                    ]}
                >
                    {selectedRecord && (
                        <div>
                            <p> Tên : {selectedRecord.fullName}</p>
                            <p> Ngày sinh : {selectedRecord.date_of_birth}</p>
                            <p> Giới tính : {selectedRecord.gender}</p>
                            <p> Email : {selectedRecord.email}</p>
                        </div>
                        )}
                </Modal>
            </div>
        </div>
        
    </>);
}