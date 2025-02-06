"use client"

import { useRef } from "react"
import { X } from "lucide-react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const ScheduleModal = ({ open, onClose, onSchedule }) => {
  const modalRef = useRef(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const dragRef = useRef(null)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`fixed bg-white ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[30px]"
            : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] rounded-[30px]"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Schedule for Later</h2>
              <p className="text-sm text-gray-500">Decide a time when you want this campaign to be sent</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#383268]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time (GMT+1)</label>
              <input
                type="time"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#383268]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onSchedule(new Date())}
              className="px-4 py-2 bg-[#383268] text-white rounded-lg hover:bg-[#2a2a5a]"
            >
              Schedule Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleModal

