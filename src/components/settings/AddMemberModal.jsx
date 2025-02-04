import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { ChevronDown } from "lucide-react"

const roles = [
  { id: "admin", name: "Admin", handle: "@account" },
  { id: "sub-admin", name: "Sub-Admin", handle: "@account" },
  { id: "regular", name: "Regular User", handle: "@account" },
  { id: "api", name: "API User", handle: "@account" },
]

const AddMemberModal = ({ open, member, onClose, onSuccess }) => {
  const modalRef = useRef(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const dragRef = useRef(null)
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
  })

  useEffect(() => {
    if (member) {
      setFormData({
        fullName: member.name,
        email: member.email,
        role: member.role,
      })
    } else {
      setFormData({
        fullName: "",
        email: "",
        role: "",
      })
    }
  }, [member])

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

  const handleSubmit = () => {
    onSuccess(member ? "Team member updated successfully" : "Team member added successfully")
    onClose()
  }

  const isFormValid = formData.fullName && formData.email && formData.role

  return (
    open && (
      <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
        <div
          ref={modalRef}
          className={`fixed bg-white ${
            isMobile ? "inset-x-0 bottom-0 rounded-t-[30px]" : "top-4 bottom-4 right-3 w-[517px] rounded-[30px]"
          }`}
          onTouchStart={handleDragStart}
          onMouseDown={handleDragStart}
          onTouchMove={handleDragMove}
          onMouseMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onMouseUp={handleDragEnd}
        >
          {isMobile && <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mt-4" />}

          <div className="p-6 flex flex-col h-full">
            <div className="flex-1">
              <h2 className="text-[18px] font-medium text-[#1A1A1A] mb-1">
                {member ? "Edit Member" : "Add New Member"}
              </h2>
              <p className="text-[14px] text-[#767676] mb-6">
                {member ? "Edit team member details and permissions." : "Add a new team member and assign their role."}
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#1A1A1A]">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="enter full name"
                    className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#383268]"
                  />
                  <p className="text-[12px] text-[#767676]">This is a hint text to help user.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#1A1A1A]">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="enter email address"
                    className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#383268]"
                  />
                  <p className="text-[12px] text-[#767676]">This is a hint text to help user.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#1A1A1A]">Assign Role</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                      className="w-full px-3 py-2 text-left border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#383268] flex items-center justify-between"
                    >
                      <span className={formData.role ? "text-[#1A1A1A]" : "text-[#767676]"}>
                        {formData.role || "select role"}
                      </span>
                      <ChevronDown className="h-5 w-5 text-[#767676]" />
                    </button>

                    {showRoleDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-[#D0D5DD] rounded-lg shadow-lg">
                        {roles.map((role) => (
                          <button
                            key={role.id}
                            onClick={() => {
                              setFormData({ ...formData, role: role.name })
                              setShowRoleDropdown(false)
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                          >
                            <span className="text-[#1A1A1A]">{role.name}</span>
                            <span className="text-[#767676] text-sm">{role.handle}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-[12px] text-[#767676]">This is a hint text to help user.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-6">
              <button onClick={onClose} className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#344054]">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`px-4 py-2 rounded-lg ${
                  isFormValid
                    ? "bg-[#383268] text-white hover:bg-[#2a2a5a]"
                    : "bg-[#EBEBF0] text-[#383268] cursor-not-allowed"
                }`}
              >
                {member ? "Save Changes" : "Add User"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default AddMemberModal

