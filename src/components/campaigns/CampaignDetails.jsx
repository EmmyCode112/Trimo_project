"use client"

import { useEffect, useRef, useState } from "react"
import { Edit, ChevronDown, X, Send, Clock } from "lucide-react"
import { MessageTypeBadge, StatusBadge } from "./badges"
import { BarChart, LineChart, PieChart } from "./charts"
import ScheduleModal from "./ScheduleModal"

const CampaignDetails = ({ campaign, onClose }) => {
  const modalRef = useRef(null)
  const dragRef = useRef(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showActionMenu, setShowActionMenu] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(campaign?.status === "Draft")
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

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

  const metrics = [
    {
      label: "Recipient Count",
      value: showEmptyState ? "0" : "50",
      total: "/100",
    },
    {
      label: "Delivery Success Rate",
      value: showEmptyState ? "0%" : "98%",
    },
    {
      label: "Failure Rate",
      value: showEmptyState ? "0%" : "20%",
    },
    {
      label: "Click Rate",
      value: showEmptyState ? "0%" : "25%",
    },
    {
      label: "Open Rate",
      value: showEmptyState ? "0%" : "10%",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`fixed bg-white h-full ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[30px] max-h-[90vh]"
            : "top-0 right-4 w-auto rounded-[30px] shadow-xl animate-slide-in max-w-[800px]"
        } overflow-y-auto`}
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
        onTouchMove={handleDragMove}
        onMouseMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseUp={handleDragEnd}
      >
        {isMobile && <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mt-4" />}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{campaign.name}</h1>
              <p className="mt-1 text-sm text-gray-500">{campaign.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <MessageTypeBadge type={campaign.type} />
                <StatusBadge status={campaign.status} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowActionMenu(!showActionMenu)}
                  className="inline-flex items-center px-4 py-2 bg-[#383268] text-white rounded-lg hover:bg-[#2a2a5a]"
                >
                  Action
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {showActionMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          console.log("Send Now")
                          setShowActionMenu(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Now
                      </button>
                      <button
                        onClick={() => {
                          setShowScheduleModal(true)
                          setShowActionMenu(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Schedule for Later
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Message */}
          {campaign.status === "Draft" && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
              <p className="text-sm text-gray-600">Analytics will be available once the campaign is sent.</p>
              <button onClick={() => setShowEmptyState(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Metrics */}
          <div className="overflow-x-auto hide-scrollbar mb-6">
            <div className="flex gap-4 min-w-max">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 w-[200px]">
                  <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {metric.value}
                    {metric.total && <span className="text-sm text-gray-500">{metric.total}</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="space-y-6">
            {/* Delivery vs. Failure */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-base font-semibold mb-2">Delivery vs. Failure</h3>
              <p className="text-sm text-gray-500 mb-4">
                Your top-performing campaigns with engagement insights and key stats.
              </p>
              <div className="h-[300px]">
                <BarChart isEmpty={showEmptyState} />
              </div>
            </div>

            {/* Engagement Trends */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-base font-semibold mb-2">Engagement Trends</h3>
              <p className="text-sm text-gray-500 mb-4">
                Monitor recent delivery rate across channels for optimal performance
              </p>
              <div className="h-[300px]">
                <LineChart isEmpty={showEmptyState} />
              </div>
            </div>

            {/* Open/Click Rate Distribution */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-base font-semibold mb-2">Open/Click Rate Distribution</h3>
              <p className="text-sm text-gray-500 mb-4">
                Monitor recent delivery rate across channels for optimal performance
              </p>
              <div className="h-[300px]">
                <PieChart isEmpty={showEmptyState} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScheduleModal
        open={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={(date, time) => {
          console.log("Scheduling campaign for:", date, time)
          setShowScheduleModal(false)
        }}
      />
    </div>
  )
}

export default CampaignDetails

