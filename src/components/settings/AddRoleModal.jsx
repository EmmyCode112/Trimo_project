import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const permissions = [
  "Campaign Management",
  "User Management",
  "Analytics",
  "Templates",
  "Wallet Management",
  "API Usage",
  "Notifications",
  "Account Settings",
  "API Key Management",
  "Webhook Configuration",
]

const AddRoleModal = ({ open, role, onClose, onSuccess }) => {
  const modalRef = useRef(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const dragRef = useRef(null)

  const [formData, setFormData] = useState({
    roleName: "",
    permissions: {},
  })

  useEffect(() => {
    if (role) {
      setFormData({
        roleName: role.name,
        permissions: role.permissions.reduce((acc, perm) => {
          if (perm === "Full Access") {
            permissions.forEach((p) => (acc[p] = true))
          } else {
            acc[perm] = true
          }
          return acc
        }, {}),
      })
    } else {
      setFormData({
        roleName: "",
        permissions: permissions.reduce((acc, perm) => {
          acc[perm] = false
          return acc
        }, {}),
      })
    }
  }, [role])

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

  const handlePermissionToggle = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission],
      },
    }))
  }

  const handleSubmit = () => {
    onSuccess(role ? "Role updated successfully" : "Role created successfully")
    onClose()
  }

  const isFormValid = formData.roleName && Object.values(formData.permissions).some(Boolean)

  if (!open) return null

  return (
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
            <h2 className="text-[18px] font-medium text-[#1A1A1A] mb-1">{role ? "Edit Role" : "Add New Role"}</h2>
            <p className="text-[14px] text-[#767676] mb-6">
              {role ? "Edit role details and permissions." : "Create a new role and assign permissions."}
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#1A1A1A]">Role Name</label>
                <input
                  type="text"
                  value={formData.roleName}
                  onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                  placeholder="enter role name"
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#383268]"
                />
                <p className="text-[12px] text-[#767676]">This is a hint text to help user.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#1A1A1A]">Permissions</label>
                <div className="space-y-3">
                  {permissions.map((permission) => (
                    <div key={permission} className="flex items-center justify-between">
                      <span className="text-[14px] text-[#1A1A1A]">{permission}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.permissions[permission]}
                          onChange={() => handlePermissionToggle(permission)}
                          className="sr-only peer"
                        />
                        <div className="w-[36px] h-[20px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all peer-checked:bg-[#383268]"></div>
                      </label>
                    </div>
                  ))}
                </div>
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
              {role ? "Save Changes" : "Add Role"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRoleModal

