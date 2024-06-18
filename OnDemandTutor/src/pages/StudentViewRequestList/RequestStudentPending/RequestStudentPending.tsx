import { faBook,  faCalendarDays, faClock, faGraduationCap, faSchool} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "antd";
import Search from "antd/es/transfer/search";
import { useState } from "react";
import {  FaSearch } from 'react-icons/fa';
const options1 = [
    {label:'Lọc theo thời gian'},
    { value: 'apple', label: 'Thời gian' },
    { value: 'banana', label: 'Môn' },
    { value: 'cherry', label: '=))' },
  ];
  const options2 = [
    {label:'Phương thức'},
    { value: 'apple', label: 'Học trực tiếp' },
    { value: 'banana', label: 'Học online' },
    { value: 'cherry', label: 'Học theo tiếng' },
  ];
  const options3 = [
    {label:'Môn'},
    { value: 'apple', label: 'Toán' },
    { value: 'banana', label: 'Tiếng Việt' },
    { value: 'cherry', label: 'Tiếng Anh' },
  ];
const data = Array.from({ length: 10 }, () => ({
    idRequest:"1",
    title:"Học vãi luôn",
  date:"24-05-2024",
  LearningMethod:"Học Trực Tiếp",
  class:"Lớp 7",
  price:"12.000.000đ",
  subject:"Toán",
  timeEnd:"10:30",
  timeStart:"9:30",
  description:"Vừa học vừa chơi nhaa",
  status:"processing"
  }))
function RequestStudentPending() {
    const [selectedOption1, setSelectedOption1] = useState(null);// component lọc// sẽ chia nhỏ thành components sau nhen fen
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);
    //const [searchTerm, setSearchTerm] = useState('');// component lọc
    const handleSelectChange = (option:any) => {
        setSelectedOption1(option)
    };
    const handleSelectChange2 = (option:any) => {
        setSelectedOption2(option)
    };
    const handleSelectChange3 = (option:any) => {
        setSelectedOption3(option)
    };

    return (
    <div className="bg-gray-200 w-4/5 p-3">
        <div className="m-3"><Search/></div>
        <div className="flex ">
            <div className="text-left flex justify-between p-3 w-11/12">
            <Select
            value={selectedOption1}
            onChange={handleSelectChange}
            options={options1}
            placeholder="Lọc theo"
            className="w-[200px]"
            />
            <Select
            value={selectedOption2}
            onChange={handleSelectChange2}
            options={options2}
            placeholder="Lọc theo"
            className="w-[200px]"
            />
            <Select
            value={selectedOption3}
            onChange={handleSelectChange3}
            options={options3}
            placeholder="Lọc theo"
            className="w-[200px]"
            />
            {/* Kính lúp không chạy ????????????? */} 
            
            
            </div>
            <div className=" ml-5 h-14 flex-nowrap content-center hover:scale-150 transition-transform duration-300 cursor-pointer">
                <div className="">
                <FaSearch />
                </div>
            
            </div>
        </div>
        
        
        <div className="p-3"> {/* quản lí thẻ request ở đây nha fen */} 
            <div className="flex justify-between mr-20 ml-32">
                <div>Thông tin đơn</div>
                <div>Tình Trạng</div>
            </div>
            <div className="pt-5 bg-gray-100 around">
            {data.map((request,key)=>(
                <div className="m-5 p-3 flex border shadow-md hover:shadow-2xl rounded-md" key={key}>
                    <div className=" w-10/12 bg-slate-100 text-left justify-between text-base p-5 border shadow-md">
                        <div className="text-lg font-bold text-center pr-56 ">{request.title}</div>
                        <div className="flex justify-between">
                            <div className="trái">
                                <div><FontAwesomeIcon icon={faCalendarDays} className="mr-2"/>{request.date}</div>
                                <div><FontAwesomeIcon icon={faSchool} className="mr-2"/>{request.LearningMethod} </div> 
                                <div><FontAwesomeIcon icon={faGraduationCap} className="mr-2"/>{request.class}</div>
                                <div><FontAwesomeIcon icon={faBook}className="mr-2"/>{request.subject}</div>
                            </div>
                            <div className="flex ">
                                <div>
                                    <div className="font-bold text-lg"> Giá mong muốn </div>
                                    <div>{request.price}</div>
                                </div>
                            </div>
                        </div>
                        <div><FontAwesomeIcon icon={faClock}/> {request.timeStart} tới {request.timeEnd}</div>
                        <div> Mong muốn:  {request.description}</div>
                    </div>
                    <div className="bg-pink-100 shadow-md w-1/6 flex items-center justify-center text-center">
                        Đang Duyệt
                    </div>
                </div>
                
            ))}
            </div>
            
        </div>
    </div>  );
}

export default RequestStudentPending;
