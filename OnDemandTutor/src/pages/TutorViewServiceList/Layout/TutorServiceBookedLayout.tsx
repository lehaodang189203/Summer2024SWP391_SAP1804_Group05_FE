
import NavTutorViewService from '../Nav/NavTutorViewService'
import TutorViewServiceBooked from '../TutorViewServiceBooked/TutorViewServiceBooked'
import RequestStudentCurrent from '../TutorViewServiceBooked/TutorViewServiceBooked'

function TutorServiceBookedLayout() {
  return (
    <>
      <div className='w-4/5'>
        <NavTutorViewService />
        <div className=' border-2 shadow-xl'>
          <TutorViewServiceBooked />
        </div>
      </div>
    </>
  )
}

export default TutorServiceBookedLayout
