import home from '../../assets/img/NewHome.jpg'

export default function Home() {
  return (
    <div className='w-auto bg-white rounded-3xl shadow-2xl border-red-500   '>
      <div className='relative  w-full'>
        <div className=' w-full'>
          <img
            src={home}
            className='w-full h-[40rem]  object-cover rounded-3xl'
          />
          <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-3xl'></div>
          <div className='absolute mx-auto top-36 left-24 w-[550px] h-[50px] '>
            <h2 className='text-white font-bold text-2xl'>
              NỀN TẢNG TÌM NGƯỜI DẠY THEO YÊU CẦU
            </h2>
            <br />
            <span className='text-white font-bold text-2xl'>
              ODT-Learn là nơi bạn có thể kết nối với nhiều gia sư uy tín và có
              kinh nghiệm trong nhiều lĩnh vực khác nhau bao gồm Toán học, Vật
              lý, Hóa học, Tiếng Anh, và nhiều môn học khác. Chúng tôi cung cấp
              các thông tin về nhu cầu học tập hiệu quả, nhanh chóng và tiện lợi
              như dạy kèm 1:1, hỗ trợ giải bài tập và nhiều dịch vụ hữu ích
              khác. Mục tiêu của chúng tôi là giúp bạn "Kiến tạo tri thức, Vững
              bước tương lai".
            </span>
          </div>
        </div>
      </div>

      <div className=' justify-center items-center flex h-[40rem] py-[5rem] '>
        <div className='h-[10rem] w-full  justify-arround border-'>
          <img
            src='https://etalkschool.com/wp-content/uploads/sites/6/2022/03/icon_4.svg'
            className='mx-[2rem] h-[8rem] w-[5rem]'
          />
          <div>
            <div className='ml-3 items-end flex'>
              <span className='text-black text-base'>
                OTD Learn là hệ thống hỗ trợ tìm gia sư theo yêu cầu, giúp học
                sinh tìm kiếm giảng viên phù hợp với mong muốn cá nhân. Gia sư
                có thể mở lớp dạy để tìm kiếm học sinh, từ đó tăng cường thu
                nhập.
              </span>
            </div>
          </div>
        </div>

        <div className='h-[10rem] w-full justify-arround'>
          <img
            src='https://etalkschool.com/wp-content/uploads/sites/6/2022/03/icon_5.svg'
            className='mx-[2rem] h-[8rem] w-[5rem]'
          />
          <div>
            <div className='ml-3 items-end flex'>
              <span className='text-black  text-base'>
                Học sinh có thể dễ dàng tìm gia sư 1-1 theo yêu cầu, với thời
                gian học linh hoạt. Bạn có thể lên lịch lớp học theo thời gian
                của mình và chọn gia sư phù hợp với nhu cầu học tập của bạn.
              </span>
            </div>
          </div>
        </div>

        <div className='h-[10rem] w-full justify-arround'>
          <img
            src='https://etalkschool.com/wp-content/uploads/sites/6/2022/03/icon_6.svg'
            className='mx-[2rem] h-[8rem] w-[5rem]'
          />
          <div>
            <div className='ml-3 items-end flex'>
              <span className='text-black  text-base'>
                Thời lượng bài học được thiết kế linh hoạt để phù hợp với nhu
                cầu của học sinh. Các lớp học có thể được điều chỉnh về thời
                gian sao cho phù hợp với lịch trình của bạn.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
