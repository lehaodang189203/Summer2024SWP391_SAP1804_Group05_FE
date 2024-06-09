import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import me from '../../assets/img/me.jpg'
import {
  faPersonHalfDress,
  faSchool,
  faUserGraduate
} from '@fortawesome/free-solid-svg-icons'

interface Props {
  handleHidden: () => void
  tutor: {
    name: string
    gender: string
    lessons: string
    major: string
    description: string
  }
}

export default function Popup({ handleHidden, tutor }: Props) {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50'>
      <div className='bg-gray-200 w-full max-w-lg mx-auto rounded-[1.75rem] shadow-2xl shadow-black overflow-hidden relative'>
        {/* Close button */}
        <button
          className='absolute top-1 right-4 text-pink-400 font-bold text-2xl'
          onClick={handleHidden}
        >
          x
        </button>
        {/* Popup content */}
        <div className='overflow-y-auto p-4'>
          {/* img */}
          <div className='flex justify-center py-4'>
            <img src={me} alt='Tutor' className='w-32 h-32 rounded-full' />
          </div>
          {/* description */}
          <div className='mx-4 my-5'>
            <div className='py-2'>
              <div className='justify-start flex pl-2'>
                <div>
                  <h1 className='text-2xl font-bold text-start'>
                    {tutor.name}
                  </h1>
                  {/* gender */}
                  <div className='text-lg flex pl-1 pt-2'>
                    <FontAwesomeIcon
                      icon={faPersonHalfDress}
                      className='pt-2 h-6'
                    />
                    <span className='pl-2 pt-1'>{tutor.gender}</span>
                  </div>
                  {/* study */}
                  <div className='text-lg flex pl-1 pt-2'>
                    <FontAwesomeIcon icon={faSchool} className='pt-2' />
                    <span className='pl-2 pt-1'>{tutor.lessons}</span>
                  </div>
                  {/* study */}
                  <div className='text-lg flex pl-1 pt-2'>
                    <FontAwesomeIcon icon={faUserGraduate} className='pt-2' />
                    <span className='pl-2 pt-1'>{tutor.major}</span>
                  </div>
                  {/* Description */}
                  <div className='pt-2 text-left'>{tutor.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
