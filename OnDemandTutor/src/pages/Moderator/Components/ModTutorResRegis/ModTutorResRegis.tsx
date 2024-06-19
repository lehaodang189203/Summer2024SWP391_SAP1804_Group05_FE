import Search from 'antd/es/transfer/search'
import ModMenu from '../ModMenu/ModMenu'
import { useState } from 'react'
import { Button, Modal, Table, TableColumnsType } from 'antd'
interface DataType {
  AccountID: string
  FullName: string
  Date_Of_Birth: string
  Gender: string
  SubjectName: string
  Experience: number
  SpecializedSkill: string
  QualificationName: string[] // có nhhiều nhen
  Img: string
  Type: string
  // statuses: string[];
}
const data = [
  {
    AccountID: '21',
    FullName: 'Trịnh Quốc Khánh',
    Date_Of_Birth: '2000-01-19',
    Gender: 'Nam',
    SubjectName: 'Thể Dục',
    Experience: 6,
    SpecializedSkill: ['Huấn Luyện Thể Thao', 'Dạy toán'],
    QualificationName: 'Bằng Tiến sĩ',
    Img: 'url10',
    Type: 'Bằng'
  },
  {
    AccountID: '22',
    FullName: 'Nguyễn Văn A',
    Date_Of_Birth: '1985-03-15',
    Gender: 'Nam',
    SubjectName: 'Toán',
    Experience: 10,
    SpecializedSkill: ['Dạy Toán', 'Toán cao cấp'],
    QualificationName: 'Thạc sĩ',
    Img: 'url11',
    Type: 'Bằng'
  },
  {
    AccountID: '23',
    FullName: 'Lê Thị B',
    Date_Of_Birth: '1990-07-22',
    Gender: 'Nữ',
    SubjectName: 'Văn',
    Experience: 8,
    SpecializedSkill: ['Dạy Văn', 'Viết Sáng Tạo'],
    QualificationName: 'Cử nhân',
    Img: 'url12',
    Type: 'Bằng'
  },
  {
    AccountID: '24',
    FullName: 'Phạm Quốc C',
    Date_Of_Birth: '1978-12-05',
    Gender: 'Nam',
    SubjectName: 'Lịch Sử',
    Experience: 15,
    SpecializedSkill: ['Nghiên Cứu Lịch Sử', 'Dạy Lịch Sử'],
    QualificationName: 'Tiến sĩ',
    Img: 'url13',
    Type: 'Bằng'
  },
  {
    AccountID: '25',
    FullName: 'Trần Thị D',
    Date_Of_Birth: '1995-09-10',
    Gender: 'Nữ',
    SubjectName: 'Địa Lý',
    Experience: 5,
    SpecializedSkill: ['Nghiên Cứu Địa Lý', 'Dạy Địa Lý'],
    QualificationName: 'Thạc sĩ',
    Img: 'url14',
    Type: 'Bằng'
  },
  {
    AccountID: '26',
    FullName: 'Hoàng Văn E',
    Date_Of_Birth: '1983-04-23',
    Gender: 'Nam',
    SubjectName: 'Hóa Học',
    Experience: 12,
    SpecializedSkill: ['Nghiên Cứu Hóa Học', 'Dạy Hóa Học'],
    QualificationName: 'Tiến sĩ',
    Img: 'url15',
    Type: 'Bằng'
  },
  {
    AccountID: '27',
    FullName: 'Đỗ Thị F',
    Date_Of_Birth: '1987-08-19',
    Gender: 'Nữ',
    SubjectName: 'Sinh Học',
    Experience: 9,
    SpecializedSkill: ['Nghiên Cứu Sinh Học', 'Dạy Sinh Học'],
    QualificationName: 'Tiến sĩ',
    Img: 'url16',
    Type: 'Bằng'
  },
  {
    AccountID: '28',
    FullName: 'Ngô Văn G',
    Date_Of_Birth: '1992-02-28',
    Gender: 'Nam',
    SubjectName: 'Vật Lý',
    Experience: 7,
    SpecializedSkill: ['Nghiên Cứu Vật Lý', 'Dạy Vật Lý'],
    QualificationName: 'Thạc sĩ',
    Img: 'url17',
    Type: 'Bằng'
  },
  {
    AccountID: '29',
    FullName: 'Lý Thị H',
    Date_Of_Birth: '1998-11-11',
    Gender: 'Nữ',
    SubjectName: 'Tin Học',
    Experience: 3,
    SpecializedSkill: ['Lập Trình', 'Dạy Tin Học'],
    QualificationName: 'Cử nhân',
    Img: 'url18',
    Type: 'Bằng'
  },
  {
    AccountID: '30',
    FullName: 'Đặng Văn I',
    Date_Of_Birth: '1975-06-30',
    Gender: 'Nam',
    SubjectName: 'Thể Dục',
    Experience: 20,
    SpecializedSkill: ['Huấn Luyện Thể Thao', 'Giáo Dục Thể Chất'],
    QualificationName: 'Tiến sĩ',
    Img: 'url19',
    Type: 'Bằng'
  },
  {
    AccountID: '31',
    FullName: 'Mai Thị J',
    Date_Of_Birth: '1981-05-08',
    Gender: 'Nữ',
    SubjectName: 'Ngoại Ngữ',
    Experience: 14,
    SpecializedSkill: ['Dạy Tiếng Anh', 'Dịch Thuật'],
    QualificationName: 'Thạc sĩ',
    Img: 'url20',
    Type: 'Bằng'
  },
  {
    AccountID: '32',
    FullName: 'Phan Văn K',
    Date_Of_Birth: '1991-03-17',
    Gender: 'Nam',
    SubjectName: 'Toán',
    Experience: 6,
    SpecializedSkill: ['Toán Ứng Dụng', 'Dạy Toán'],
    QualificationName: 'Thạc sĩ',
    Img: 'url21',
    Type: 'Bằng'
  },
  {
    AccountID: '33',
    FullName: 'Tô Thị L',
    Date_Of_Birth: '1984-12-14',
    Gender: 'Nữ',
    SubjectName: 'Văn',
    Experience: 11,
    SpecializedSkill: ['Phê Bình Văn Học', 'Dạy Văn'],
    QualificationName: 'Tiến sĩ',
    Img: 'url22',
    Type: 'Bằng'
  },
  {
    AccountID: '34',
    FullName: 'Vũ Văn M',
    Date_Of_Birth: '1996-10-02',
    Gender: 'Nam',
    SubjectName: 'Lịch Sử',
    Experience: 4,
    SpecializedSkill: ['Nghiên Cứu Lịch Sử', 'Dạy Lịch Sử'],
    QualificationName: 'Cử nhân',
    Img: 'url23',
    Type: 'Bằng'
  },
  {
    AccountID: '35',
    FullName: 'Cao Thị N',
    Date_Of_Birth: '1980-07-07',
    Gender: 'Nữ',
    SubjectName: 'Địa Lý',
    Experience: 18,
    SpecializedSkill: ['Nghiên Cứu Địa Lý', 'Dạy Địa Lý'],
    QualificationName: 'Tiến sĩ',
    Img: 'url24',
    Type: 'Bằng'
  },
  {
    AccountID: '36',
    FullName: 'Đinh Văn O',
    Date_Of_Birth: '1986-09-21',
    Gender: 'Nam',
    SubjectName: 'Hóa Học',
    Experience: 9,
    SpecializedSkill: ['Nghiên Cứu Hóa Học', 'Dạy Hóa Học'],
    QualificationName: 'Thạc sĩ',
    Img: 'url25',
    Type: 'Bằng'
  },
  {
    AccountID: '37',
    FullName: 'Nguyễn Thị P',
    Date_Of_Birth: '1993-11-19',
    Gender: 'Nữ',
    SubjectName: 'Sinh Học',
    Experience: 5,
    SpecializedSkill: ['Nghiên Cứu Sinh Học', 'Dạy Sinh Học'],
    QualificationName: 'Thạc sĩ',
    Img: 'url26',
    Type: 'Bằng'
  },
  {
    AccountID: '38',
    FullName: 'Lê Văn Q',
    Date_Of_Birth: '1997-01-13',
    Gender: 'Nam',
    SubjectName: 'Vật Lý',
    Experience: 3,
    SpecializedSkill: ['Nghiên Cứu Vật Lý', 'Dạy Vật Lý'],
    QualificationName: 'Cử nhân',
    Img: 'url27',
    Type: 'Bằng'
  }
]
export default function ModTutorResRegis() {
  const [searchText, setSearchText] = useState('') // liên quan đến giá trị input vào search
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null)
  const [visible, setVisible] = useState(false)
  const [isDetails, setIsDetails] = useState(false)

  const columns: TableColumnsType<DataType> = [
    {
      // định nghĩa từng cột
      title: 'Tên', // tên của cột hay còn gọi là header của cột
      dataIndex: 'FullName', // xác định trường nào trong interface DataType
      //defaultSortOrder: "descend",
      //onFilter: (value, record) => record.FullName.indexOf(value as string) === 0,
      //sorter: (a, b) => a.FullName.length - b.FullName.length,
      width: 200,
      fixed: 'left'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'Date_Of_Birth',
      width: 150
      //defaultSortOrder: "descend",
      //sorter: (a, b) => new Date(a.Date_Of_Birth).getTime() - new Date(b.Date_Of_Birth).getTime()
    },
    {
      title: 'Giới Tính',
      dataIndex: 'Gender',
      //sorter: (a, b) => parseInt(a.Gender) - parseInt(b.Gender),
      width: 100
    },
    {
      title: 'Tên Môn Học',
      dataIndex: 'SubjectName',
      //defaultSortOrder: "descend",
      width: 150
      //sorter: (a, b) => parseInt(a.SubjectName) - parseInt(b.SubjectName),
    },
    {
      title: 'Kinh Nghiệm(Năm)',
      dataIndex: 'Experience',
      width: 200
      //defaultSortOrder: "descend",
      //sorter: (a, b) => (a.Experience - b.Experience)
    },
    {
      title: 'Tên Bằng Cấp(Chứng chỉ)',
      dataIndex: 'QualificationName',
      //defaultSortOrder: "descend"
      width: 200
    },
    {
      title: 'Kĩ Năng Nổi bật',
      dataIndex: 'SpecializedSkill',
      width: 200
    },
    {
      title: 'Ảnh',
      dataIndex: 'Img',
      className: 'TextAlign',
      width: 120,
      fixed: 'right',
      render: (text: string, record: DataType) => (
        <div className='flex gap-1'>
          <button
            className='p-1 border border-red-500 rounded-lg hover:bg-red-500 active:bg-red-700'
            onClick={() => showImg(record)}
          >
            Xem Bằng
          </button>
        </div>
      )
    },
    {
      title: 'Hành Động',
      dataIndex: 'action',
      className: 'TextAlign',
      fixed: 'right',
      width: 150,
      render: (text: string, record: DataType) => (
        <div className='flex gap-1'>
          <button
            className='p-1 border border-red-500 rounded-lg hover:bg-red-500 active:bg-red-700'
            onClick={() => showDetail(record)}
          >
            Hành Động
          </button>
        </div>
      )
    }
  ]

  const onChange = () => {}

  const showDetail = (record: DataType) => {
    setSelectedRecord(record)
    setVisible(true)
    setIsDetails(true)
  }
  const handleCancel = () => {
    setVisible(false)
    setSelectedRecord(null)
  }
  const showImg = (record: DataType) => {
    setSelectedRecord(record)
    setVisible(true)
    setIsDetails(false)
  }
  const title = isDetails ? 'Chi tiết' : 'Ảnh'
  return (
    <>
      <div>
        <div className='text-left'>Yêu cầu trở thành gia sư</div>
        <ModMenu kind='tutor' style='Option1' />
        <div className='text-left shadow-2xl shadow-black border-4 pt-5 h-[629px] rounded-t-xl mt-6'>
          <div className='mb-5'>
            <Search
            // inputText={searchText}
            // placeHolder="Search đi nè"
            // setInputValue={setSearchText}
            // label="Q"
            />
          </div>
          <Table
            className=''
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
            scroll={{ x: 1300, y: 400 }}
          />
          <div>
            <Modal
              title={title}
              visible={visible}
              onCancel={handleCancel}
              footer={[
                <Button key='back' onClick={handleCancel}>
                  Xác nhận
                </Button>,
                <Button key='back' onClick={handleCancel}>
                  Từ chối
                </Button>
              ]}
            >
              {selectedRecord && (
                <div>
                  {isDetails ? (
                    <div>
                      <p>Tên : {selectedRecord.FullName}</p>
                      <p>Ngày sinh : {selectedRecord.Date_Of_Birth}</p>
                      <p>Giới tính : {selectedRecord.Gender}</p>
                      <p>Môn : {selectedRecord.SubjectName}</p>
                      <p>Bằng cấp(Chứng chỉ) : {selectedRecord.Type}</p>
                      <p>Tên bằng Cấp : {selectedRecord.QualificationName}</p>
                      <p>
                        Kĩ năng đặc biệt : {selectedRecord.SpecializedSkill}
                      </p>
                      {/* <img src={selectedRecord.Img} alt="ảnh" />    // ảnh nè  */}
                      <p>Kinh nghiệm dạy : {selectedRecord.Experience} Năm</p>
                      <p>Kĩ năng nổi bật: {selectedRecord.SpecializedSkill}</p>
                    </div>
                  ) : (
                    <p>Ảnh nèk : {selectedRecord.Img}</p>
                  )}
                </div>
              )}
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}
