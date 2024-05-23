import home from '../../assets/img/home.jpg'

export default function Home() {
  return (
    <div className='bg-black top-0'>
      <div>
        <div className='h-[50rem] mb-[48rem] z-0'>
          <div className='relative w-full h-full '>
            <img src={home} className='w-full h-full object-cover' />
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
            <div className='absolute top-20 left-24 w-[550px] h-[50px] '>
              <h2 className='text-white font-bold text-2xl'>NỀN TẢNG TÌM NGƯỜI DẠY THEO YÊU CẦU </h2>
              <br />
              <span className='text-white font-bold text-2xl'>
                ODT-Learning nơi mà bạn có thể kết nối với nhiều gia sư có uy tính và kinh nghiệm thuộc nhiều lĩnh vực
                khác nhau bao gồm Information , Language, Bussiness, Marketing... để hổ trợ học tập một cách hiệu quả,
                nhanh chóng và tiện lợi. Ngoài ra chúng tôi còn cung cấp một số dịch vụ như dạy kèm 1:1, hướng dẫn sinh
                viên giải bài tập và còn nhiều dịch vụ khác nữa. Nhầm hổ trợ bạn trên con đường "Kiến tạo tri thức ,
                Vững chảy tương lai".
              </span>
            </div>
          </div>

          <div style={{ background: '#F7F3F3' }} className=' justify-center items-center flex h-[48rem] py-[5rem] '>
            <div className='h-[20rem] w-full  justify-arround border-'>
              <img
                src='https://etalkschool.com/wp-content/uploads/sites/6/2022/03/icon_4.svg'
                className='mx-[2rem] h-[8rem] w-[5rem]'
              />
              <div>
                <div className='items-end flex'>
                  <span className='text-black text-xl pl-[2rem] border-transpenrant'>
                    Lớp học ảo eTalk của tôi eTalk cung cấp khả năng video và âm thanh, lớp học ảo và tài liệu học tập
                    kỹ thuật số tương tác cho tất cả các lớp, khiến nó trở thành nền tảng lý tưởng cho gia sư và sinh
                    viên.
                  </span>
                </div>
              </div>
            </div>

            <div className='h-[20rem] w-full justify-arround'>
              <img
                src='https://etalkschool.com/wp-content/uploads/sites/6/2022/03/icon_5.svg'
                className='mx-[2rem] h-[8rem] w-[5rem]'
              />
              <div>
                <div className='items-end flex'>
                  <span className='text-black text-center text-xl pl-[2rem]'>
                    Học 1-1 với giáo viên riêng Nhận các bài học riêng với giáo viên trên eTalk vào thời điểm phù hợp
                    với bạn. Bạn có thể lên lịch, nhắn tin, xem lại các lớp học trước đây và nhận bài tập về nhà trên
                    nền tảng này.
                  </span>
                </div>
              </div>
            </div>

            <div className='h-[20rem] w-full justify-arround'>
              <img
                src='https://etalkschool.com/wp-content/uploads/sites/6/2022/03/icon_6.svg'
                className='mx-[2rem] h-[8rem] w-[5rem]'
              />
              <div>
                <div className='items-end flex'>
                  <span className='text-black text-xl pl-[2rem]'>
                    Thời lượng bài học Học sinh nhỏ tuổi từ 5 đến 12 thường học các lớp 25 phút, trong khi học sinh lớn
                    hơn có các lớp 50 phút. Điều này cho phép sự tập trung và chú ý tối đa trong suốt bài học.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
