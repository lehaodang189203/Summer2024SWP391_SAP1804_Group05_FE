interface Props {
  handleHidden: () => void
  renderPopover: React.ReactNode
}

export default function Popup({ handleHidden, renderPopover }: Props) {
  return (
    true && (
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
          {renderPopover}
        </div>
      </div>
    )
  )
}
