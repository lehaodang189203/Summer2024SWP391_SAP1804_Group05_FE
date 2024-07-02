import React, { useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faCalendarDays,
  faClock,
  faGraduationCap,
  faSchool
} from '@fortawesome/free-solid-svg-icons'
import Status from '../status'
import { Request as RequestType } from '../../../types/request.type'
import { statusReq } from '../../../constant/status.Req'
import { path } from '../../../constant/path'
import FormRequest from '../../FormRequest/FormRequest'
import { useNavigate } from 'react-router-dom'
import { studentApi } from '../../../api/student.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface Props {
  request: RequestType
  refetch?: (() => void) | undefined
}

export default function RequestComponents({ request, refetch }: Props) {
  const [showButtons, setShowButtons] = useState(false)
  const timeoutRef = React.useRef<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()
  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShowButtons(true)
    }, 500) // 1000 milliseconds = 1 second
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShowButtons(false)
  }

  const handleOpenPopup = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const handleChangePath = (idRe: string) => {
    if (request.status === statusReq.approved) {
      navigate(`${path.tutors}/${idRe}`)
    }
  }

  //  chuaư thêm xóa
  const handleDeleteRequest = useMutation({
    mutationFn: (idRequest: string) => studentApi.deleteRequest(idRequest),
    onSuccess: (data) => {
      if (refetch) {
        toast.success(data.data.message)
        refetch() // refetch lại API khi xóa thành công
      }
    }
  })

  return (
    <>
      <div
        className={classNames(
          'container m-5 p-3 flex border shadow-md rounded-md relative',
          {
            'hover:bg-gray-200': showButtons // Add gray background when hovering
          }
        )}
        key={request.idRequest}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleChangePath(request.idRequest)}
      >
        <div className='w-10/12 bg-slate-100 rounded-xl text-left justify-between text-base p-5 border shadow-md'>
          <h1 className='font-bold text-xl text-black text-center'>
            {request.title}
          </h1>
          <div className='flex justify-between'>
            <div className='w-[10rem]'>
              <div>
                <FontAwesomeIcon icon={faCalendarDays} className='mr-2' />
                {request.timeTable}
              </div>
              <div>
                <FontAwesomeIcon icon={faSchool} className='mr-2' />
                {request.learningMethod}
              </div>
              <div>
                <FontAwesomeIcon icon={faGraduationCap} className='mr-2' />
                {request.class}
              </div>
              <div>
                <FontAwesomeIcon icon={faBook} className='mr-2' />
                {request.subject}
              </div>
              {/* time */}
              <div>
                <FontAwesomeIcon icon={faClock} /> {request.timeStart} tới{' '}
                {request.timeEnd}
              </div>
              {/* description */}
              <div>Mong muốn: {request.description}</div>
            </div>
            {/* price */}
            <div>
              <div>
                <div className='font-bold text-lg'> Giá mong muốn </div>
                <div>{request.price}</div>
              </div>
            </div>
          </div>
        </div>
        {/* status */}
        <Status request={request} />
        {/* show buttons when status is pending and hovering */}
        {'Đang duyệt' === statusReq.pending && showButtons && (
          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md'>
            <div className='flex items-center gap-2 p-3 rounded-md'>
              <button
                onClick={handleOpenPopup}
                className='bg-yellow-300 text-white px-4 py-2 rounded-md'
              >
                Cập nhật
              </button>
              <button
                onClick={() => handleDeleteRequest}
                className='bg-red-500 text-white px-4 py-2 rounded-md'
              >
                Xóa
              </button>
            </div>
          </div>
        )}
      </div>
      {showForm && <FormRequest onClose={handleCloseForm} />}
    </>
  )
}
