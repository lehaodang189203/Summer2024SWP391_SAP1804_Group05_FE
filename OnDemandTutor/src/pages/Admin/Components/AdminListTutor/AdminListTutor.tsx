import { useEffect, useState } from "react";

import TurorMenu from "../AdminMenu/TutorMenu";
import { Button, Modal, Table, TableColumnsType} from "antd";
import Search from "antd/es/transfer/search";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AdminTutorType } from "../../../../types/tutor.type";
import { toast } from "react-toastify";
import { adminAPI } from "../../../../api/admin.api";


const onChange=( )=>{}
function AdminListTutor () {
    const { data: TutorList, refetch } = useQuery<AdminTutorType[]>({
        queryKey: ['TutorList'],
        queryFn: () => adminAPI.getTutorList()
      })
    
      console.log('TutorList', TutorList)
    
      // Khởi tạo các mutation cho việc phê duyệt và từ chối yêu cầu
      const removeMutation = useMutation({
        mutationFn: (idAccount: string) => adminAPI.deleteAccount(idAccount),
        onSuccess: () => {
          toast.success('Đã xóa tài khoản')
          refetch() // Gọi lại API để cập nhật lại danh sách yêu cầu
          setVisible(false)
        }
      })
    
      useEffect(() => {
        if (TutorList) {
          console.log('TutorList',TutorList)
        }
      }, [TutorList])
    
      const handleDelete = () => {
        if (selectedRecord) {
          removeMutation.mutate(selectedRecord.id)
          console.log('id của thằng request nè ', selectedRecord.id)
        }
      }
    
      
    //const [searchText, setSearchText] = useState('');// liên quan đến giá trị input vào search
    const [selectedRecord, setSelectedRecord] = useState<AdminTutorType | null>(null);
    const [visible, setVisible] = useState(false);

    const showDetail = (record: AdminTutorType) => {
        setSelectedRecord(record);
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
        setSelectedRecord(null);
    };
    const columns: TableColumnsType<AdminTutorType> = [{// định nghĩa từng cột
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
        title:"Email",
        dataIndex:"email",
        defaultSortOrder: "descend",
        width:200,
      },{
        title:"Giới Tính",
        dataIndex:"gender",
        sorter: (a, b) => parseInt(a.gender) - parseInt(b.gender),
        width:200
      },{
        title:"Tên Môn Học",
        dataIndex:"subject",
        defaultSortOrder: "descend",
        width:200
      },{
        title:"Kinh Nghiệm",
        dataIndex:"experience",
        defaultSortOrder: "descend",
        width:200,
        sorter: (a, b) => (a.experience - b.experience)
      },{
        title:"Tên Bằng Cấp(Chứng chỉ)",
        dataIndex:"QualificationName",
        defaultSortOrder: "descend",
        width:400
      },
      {
        title: "Detail",
        dataIndex: "detail",
        className: "TextAlign",
        width:100,
        render: (text :string,record: AdminTutorType) => (<div className="flex gap-1">
          <button className="p-1 border border-red-500 rounded-lg hover:bg-red-500 active:bg-red-700"
          onClick={() => showDetail(record)}
          >Chi tiết</button></div>
        ),
        fixed:"right"
      }
    ]
    return (<>
        <div>
            <div className="text-left ">Quản lí gia sư</div>
            <TurorMenu
            list="list"
            con=""
            rej=""
            />
            <div className="text-left shadow-sm shadow-black border-4 pt-5 h-[629px] rounded-t-xl mt-6">
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
                dataSource={TutorList}
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
                            Sửa(chưa nốiapi)
                        </Button>,
                        <Button key="back" onClick={handleDelete}>
                            Xóa
                        </Button>
                    ]}
                >
                    {selectedRecord && (
                        <div>
                            <p> Tên : {selectedRecord.fullName}</p>
                            {/* <p> Email : {selectedRecord.email ?selectedRecord.email : 'Chưa cập nhập'}</p> */}
                            <p> Ngày sinh : {selectedRecord.date_of_birth ?selectedRecord.date_of_birth : 'Chưa cập nhập'}</p>
                            <p> Giới tính : {selectedRecord.gender? selectedRecord.gender:'Chưa cập nhập'}</p>
                            <p> Môn : {selectedRecord.subject ?selectedRecord.subject:'Chưa cập nhập'}</p>
                            <p>Bằng cấp(Chứng chỉ) : {selectedRecord.type ? selectedRecord.type : 'Chưa cập nhập'}</p>
                            <p> Tên bằng Cấp : {selectedRecord.qualifiCationName ?selectedRecord.qualifiCationName : 'Chưa cập nhập'}</p>
                            <p> Kĩ năng đặc biệt : {selectedRecord.specializedSkills ?selectedRecord.specializedSkills : 'Chưa cập nhập'}</p>
                            {/* <img src={selectedRecord.Img}> : {selectedRecord.Img}</img>    // ảnh nè  */}
                            <p> Kinh nghiệm dạy : {selectedRecord.experience ?selectedRecord.experience :'Chưa cập nhập số '} Năm</p> 
                        </div>
                        )}
                </Modal>
            </div>
        </div>
        
    </>);
}

export default AdminListTutor;