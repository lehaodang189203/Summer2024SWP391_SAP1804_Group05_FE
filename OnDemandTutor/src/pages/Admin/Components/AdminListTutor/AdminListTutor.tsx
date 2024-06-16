import { useState } from "react";
import Search from "../../../../components/Search/Search";
import TurorMenu from "../AdminMenu/TutorMenu";
import { Button, Modal, Table, TableColumnsType } from "antd";
interface DataType{
    AccountID: string,
    FullName:string,
    Date_Of_Birth:string,
    Gender:string,
    SubjectName:string[],
    Experience:number,
    SpecializedSkill:string,
    QualificationName:string,
    Img:string,
    Type:string
    // statuses: string[];
}

const data = [
    {
        AccountID: "12",
        FullName: "Nguyễn Trí Thành",
        Date_Of_Birth: "2003-11-27",
        Gender: "Nam",
        SubjectName: ["Toán","Ngữ Văn"],
        Experience: 4,
        SpecializedSkill: "Đọc Hiểu tiếng Việt",
        QualificationName: "Bằng Cử nhân FPT",
        Img: "url1",
        Type: "Bằng"    
    }   ,
    {
        AccountID: "13",
        FullName: "Lê Văn An",
        Date_Of_Birth: "2002-05-15",
        Gender: "Nam",
        SubjectName: "Vật Lý",
        Experience: 3,
        SpecializedSkill: "Giải Tích",
        QualificationName: "Bằng Thạc sĩ",
        Img: "url2",
        Type: "Bằng"
    },
    {
        AccountID: "14",
        FullName: "Trần Thị Hoa",
        Date_Of_Birth: "2001-08-09",
        Gender: "Nữ",
        SubjectName: "Hóa Học",
        Experience: 5,
        SpecializedSkill: "Phân Tích Hóa Học",
        QualificationName: "Bằng Tiến sĩ",
        Img: "url3",
        Type: "Bằng"
    },
    {
        AccountID: "15",
        FullName: "Phạm Ngọc Minh",
        Date_Of_Birth: "2000-12-22",
        Gender: "Nam",
        SubjectName: "Sinh Học",
        Experience: 6,
        SpecializedSkill: "Nghiên Cứu Sinh Học",
        QualificationName: "Bằng Cử nhân",
        Img: "url4",
        Type: "Bằng"
    },
    {
        AccountID: "16",
        FullName: "Đỗ Hồng Quân",
        Date_Of_Birth: "2004-04-18",
        Gender: "Nam",
        SubjectName: "Tiếng Anh",
        Experience: 2,
        SpecializedSkill: "Dịch Thuật",
        QualificationName: "Bằng Cử nhân",
        Img: "url5",
        Type: "Chứng Chỉ"
    },
    {
        AccountID: "17",
        FullName: "Ngô Thanh Hương",
        Date_Of_Birth: "1999-09-30",
        Gender: "Nữ",
        SubjectName: "Lịch Sử",
        Experience: 7,
        SpecializedSkill: "Phân Tích Lịch Sử",
        QualificationName: "Bằng Thạc sĩ",
        Img: "url6",
        Type: "Bằng"
    },
    {
        AccountID: "18",
        FullName: "Bùi Văn Phúc",
        Date_Of_Birth: "2003-11-27",
        Gender: "Nam",
        SubjectName: "Địa Lý",
        Experience: 4,
        SpecializedSkill: "Phân Tích Địa Lý",
        QualificationName: "Bằng Tiến sĩ",
        Img: "url7",
        Type: "Chứng Chỉ"
    },
    {
        AccountID: "19",
        FullName: "Lý Phương Mai",
        Date_Of_Birth: "2002-03-14",
        Gender: "Nữ",
        SubjectName: "Tin Học",
        Experience: 3,
        SpecializedSkill: "Lập Trình",
        QualificationName: "Bằng Cử nhân",
        Img: "url8",
        Type: "Bằng"
    },
    {
        AccountID: "20",
        FullName: "Dương Ngọc Lan",
        Date_Of_Birth: "2001-07-07",
        Gender: "Nữ",
        SubjectName: "Văn Học",
        Experience: 5,
        SpecializedSkill: "Phân Tích Văn Học",
        QualificationName: "Bằng Thạc sĩ",
        Img: "url9",
        Type: "Chứng Chỉ"
    },
    {
        AccountID: "21",
        FullName: "Trịnh Quốc Khánh",
        Date_Of_Birth: "2000-01-19",
        Gender: "Nam",
        SubjectName: "Thể Dục",
        Experience: 6,
        SpecializedSkill: "Huấn Luyện Thể Thao",
        QualificationName: "Bằng Tiến sĩ",
        Img: "url10",
        Type: "Bằng"
    }
];
const onChange=( )=>{}
function AdminListTutor () {
    const [searchText, setSearchText] = useState('');// liên quan đến giá trị input vào search
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
    const columns: TableColumnsType<DataType> = [{// định nghĩa từng cột
        title: "Tên", // tên của cột hay còn gọi là header của cột
        dataIndex: "FullName",// xác định trường nào trong interface DataType
        defaultSortOrder: "descend",
        onFilter: (value, record) => record.FullName.indexOf(value as string) === 0,
        sorter: (a, b) => a.FullName.length - b.FullName.length,
        
      }
      ,{
        title:"Ngày sinh",
        dataIndex:"Date_Of_Birth",
        defaultSortOrder: "descend",
        sorter: (a, b) => new Date(a.Date_Of_Birth).getTime() - new Date(b.Date_Of_Birth).getTime()
      },{
        title:"Giới Tính",
        dataIndex:"Gender",
        sorter: (a, b) => parseInt(a.Gender) - parseInt(b.Gender),
      },{
        title:"Tên Môn Học",
        dataIndex:"SubjectName",
        defaultSortOrder: "descend",
        
      },{
        title:"Kinh Nghiệm",
        dataIndex:"Experience",
        defaultSortOrder: "descend",
        sorter: (a, b) => (a.Experience - b.Experience)
      },{
        title:"Tên Bằng Cấp(Chứng chỉ)",
        dataIndex:"QualificationName",
        defaultSortOrder: "descend"
      },
      {
        title: "Detail",
        dataIndex: "detail",
        className: "TextAlign",
        render: (text: string, record: DataType) => (<div className="flex gap-1">
          <button className="p-1 border border-red-500 rounded-lg hover:bg-red-500 active:bg-red-700"
          onClick={() => showDetail(record)}
          >Chi tiết</button></div>
        )
      }
    ]
    return (<>
        <div>
            <div className="text-left p-4 ml-7">Quản lí gia sư</div>
            <TurorMenu
            list="list"
            con=""
            rej=""
            />
            <div className="m-10 text-left border-r-black border-l-black border-t-black border-2 p-5 h-[570px] rounded-t-xl ">
                <div className="mb-5">
                    <Search
                    inputText={searchText}
                    placeHolder="Search đi nè"
                    setInputValue={setSearchText}
                    label="Q"/>
                </div> 
                <Table
                className=""
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 6 }} 
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
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
                            <p> Tên : {selectedRecord.FullName}</p>
                            <p> Ngày sinh : {selectedRecord.Date_Of_Birth}</p>
                            <p> Giới tính : {selectedRecord.Gender}</p>
                            <p> Môn : {selectedRecord.SubjectName}</p>
                            <p>Bằng cấp(Chứng chỉ) : {selectedRecord.Type}</p>
                            <p> Tên bằng Cấp : {selectedRecord.QualificationName}</p>
                            <p> Kĩ năng đặc biệt : {selectedRecord.SpecializedSkill}</p>
                            {/* <img src={selectedRecord.Img}> : {selectedRecord.Img}</img>    // ảnh nè  */}
                            <p> Kinh nghiệm dạy : {selectedRecord.Experience} Năm</p> 
                        </div>
                        )}
                </Modal>
            </div>
        </div>
        
    </>);
}

export default AdminListTutor;