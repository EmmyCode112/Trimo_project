import { useEffect, useRef } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const RemoveMemberModal = ({ open, member, onClose, onConfirm }) => {
  const modalRef = useRef(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const dragRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onClose])

  const handleDragStart = (e) => {
    if (!isMobile) return
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    dragRef.current = {
      startY: clientY,
      scrollY: window.scrollY,
    }
  }

  const handleDragMove = (e) => {
    if (!dragRef.current || !isMobile || !modalRef.current) return
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const delta = clientY - dragRef.current.startY

    if (delta > 100) {
      onClose()
      dragRef.current = null
    } else {
      modalRef.current.style.transform = `translateY(${Math.max(0, delta)}px)`
    }
  }

  const handleDragEnd = () => {
    if (!modalRef.current || !isMobile) return
    modalRef.current.style.transform = ""
    dragRef.current = null
  }

  if (!open || !member) return null

  return (
    <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`fixed bg-white ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[30px]"
            : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] rounded-[30px]"
        }`}
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
        onTouchMove={handleDragMove}
        onMouseMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseUp={handleDragEnd}
      >
        {isMobile && <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mt-4" />}

        <div className="p-6">
          <div className="w-12 h-1 bg-red-500 rounded mb-4" />
          <h2 className="text-xl font-semibold mb-2">Remove Team Member</h2>
          <p className="text-[#767676] mb-6">
            Are you sure you want to remove {member.name}? This action cannot be undone.
          </p>

          <div className="flex gap-2 justify-end">
            <button onClick={onClose} className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#344054]">
              Cancel
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Remove Member
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveMemberModal

