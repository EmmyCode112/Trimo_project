import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import OTPVerification from "@/components/settings/OTPVerification"
import SuccessAlert from "@/components/Alerts/SuccessAlert"

const EditProfileModal = ({ open, onClose }) => {
  const modalRef = useRef(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const dragRef = useRef(null)
  const [step, setStep] = useState("edit")
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [editType, setEditType] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "Owai",
    lastName: "Owai",
    email: "owaiowai12@gmail.com",
    phoneCountry: "NG",
    phoneNumber: "+234 (081) 129-48088",
  })
  const [originalFormData, setOriginalFormData] = useState(formData)

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

  const hasChanges = () => {
    return (
      formData.firstName !== originalFormData.firstName ||
      formData.lastName !== originalFormData.lastName ||
      formData.email !== originalFormData.email ||
      formData.phoneCountry !== originalFormData.phoneCountry ||
      formData.phoneNumber !== originalFormData.phoneNumber
    )
  }

  const handleSaveChanges = () => {
    if (formData.firstName !== originalFormData.firstName || 
        formData.lastName !== originalFormData.lastName) {
      // For name edit, just show success toast
      setShowSuccessToast(true)
      setTimeout(() => {
        setShowSuccessToast(false)
        setOriginalFormData(formData)
      }, 1500)
      return
    }

    if (formData.email !== originalFormData.email) {
      setEditType("email")
      setStep("email-verify")
      return
    }

    if (formData.phoneNumber !== originalFormData.phoneNumber) {
      setEditType("phone")
      setStep("phone-verify")
      return
    }
  }

  const handleEmailVerification = (otp) => {
    setShowSuccessToast(true)
    setTimeout(() => {
      setShowSuccessToast(false)
      setOriginalFormData(formData)
      onClose()
    }, 1500)
  }

  const handlePhoneVerification = (otp) => {
    setShowSuccessToast(true)
    setTimeout(() => {
      setShowSuccessToast(false)
      setOriginalFormData(formData)
      onClose()
    }, 1500)
  }

  const renderContent = () => {
    switch (step) {
      case "email-verify":
        return (
          <OTPVerification
            type="email"
            onBack={() => setStep("edit")}
            onVerify={handleEmailVerification}
            initialTimer={60}
          />
        )
      case "phone-verify":
        return (
          <OTPVerification
            type="phone"
            onBack={() => setStep("edit")}
            onVerify={handlePhoneVerification}
            initialTimer={120}
          />
        )
      default:
        return (
          <div className="p-6 flex flex-col justify-between h-full space-y-6">
            {showSuccessToast && (
              <SuccessAlert
                message="Profile updated successfully!"
                onClose={() => setShowSuccessToast(false)}
              />
            )}
            <div>
              <h2 className="text-[18px] text-[#1A1A1A] font-medium pb-1">Edit Information</h2>
              <p className="text-[#767676] text-[14px] mb-5 font-normal">
                Edit your name, email, or phone number here. Ensure your details are verified to access all features.
              </p>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <div className="space-y-2 w-1/2">
                    <label className="label">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div className="space-y-2 w-1/2">
                    <label className="label">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="input"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="label">Phone number</label>
                  <div className="flex input">
                    <input
                      type="text"
                      value={formData.phoneCountry}
                      onChange={(e) => setFormData({ ...formData, phoneCountry: e.target.value })}
                      className="w-[51px] flex items-center justify-center text-center py-2 border-none outline-none bg-transparent"
                    />
                    <input
                      type="text"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="bg-transparent py-2 border-none outline-none bg-"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button 
                className="px-4 w-[89px] h-[44px] py-2 border text-[16px] border-[#C1BFD0] font-medium flex items-center justify-center bg-white hover:bg-gray-100 rounded-[8px] text-[#383268]" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className={`px-4 w-[142px] h-[44px] py-2 border text-[16px] font-medium flex items-center justify-center rounded-[8px] ${
                  hasChanges() 
                    ? 'bg-[#383268] text-white hover:bg-[#2a2a5a]' 
                    : 'bg-[#EBEBF0] text-[#383268] cursor-not-allowed'
                }`}
                onClick={handleSaveChanges}
                disabled={!hasChanges()}
              >
                Save Changes
              </button>
            </div>
          </div>
        )
    }
  }

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
        {renderContent()}
      </div>
    </div>
  )
}

export default EditProfileModal