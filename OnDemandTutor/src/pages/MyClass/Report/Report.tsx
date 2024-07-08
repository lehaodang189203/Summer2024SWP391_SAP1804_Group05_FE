import React, { useState } from 'react'

export default function Report() {
  const [reportContent, setReportContent] = useState('')

  const handleSubmit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    if (!reportContent.trim()) {
      alert('Nội dung báo cáo không được để trống')
      return
    }
    // Xử lý logic khi form được nộp và nội dung hợp lệ
    console.log('Submitted:', reportContent)
    // Reset input sau khi nộp form
    setReportContent('')
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportContent(event.target.value)
  }

  return (
    <div>
      <form onSubmit={() => handleSubmit}>
        <textarea
          value={reportContent}
          onChange={handleChange}
          placeholder='Nhập nội dung báo cáo...'
          className='border border-gray-300 p-2 rounded-md w-full'
          rows={5}
          required
        />
        <button
          type='submit'
          className='mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
        >
          Nộp báo cáo
        </button>
      </form>
    </div>
  )
}
