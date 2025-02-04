import { useState } from "react"
import TwoFactorVerification from "./SecuritySettings/TwoFactorVerification"
import DisableTwoFactorModal from "./SecuritySettings/DisableTwoFactorModal"
import SuccessAlert from "@/components/Alerts/SuccessAlert"
import more from "@/assets/Icons/more.svg"

const SecuritySettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [showDisableModal, setShowDisableModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [activeDropdown, setActiveDropdown] = useState(null)

  const sessions = [
    {
      deviceName: "Chrome on Windows",
      location: "City, Country",
      lastActive: "5 minutes ago",
      ipAddress: "190.213.161.20",
    },
    {
      deviceName: "Safari on Mac",
      location: "City, Country",
      lastActive: "Yesterday at 3:15 PM",
      ipAddress: "123.152.99.118",
    },
  ]

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  return (
    <div className="space-y-8">
      {showSuccess && <SuccessAlert message={successMessage} onClose={() => setShowSuccess(false)} />}

      {/* 2FA Section */}
      <div className="space-y-2">
        <div className="flex gap-4 lg:gap-0 lg:items-center flex-col lg:flex-row justify-between">
          <div>
            <h3 className="text-[18px] mb-2 font-medium text-[#3F3E3E]">Two-Factor Authentication (2FA)</h3>
            <p className="text-[14px] font-[400] leading-[20px] w-[323px] text-[#767676]">
              Enable 2FA for enhanced security. You'll receive an OTP during each login.
            </p>
          </div>
          <div className="w-[152px] flex items-center gap-[24px]">
            <span className="text-[#3F3E3E] font-medium text-[18px]">Enable 2FA</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={is2FAEnabled}
                onChange={() => {
                  if (is2FAEnabled) {
                    setShowDisableModal(true)
                  } else {
                    setShowVerification(true)
                  }
                }}
                className="sr-only peer"
              />
              <div className="w-[36px] h-[20px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all peer-checked:bg-[#383268]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="space-y-2">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center justify-between">
          <div className="">
            <h3 className="text-[18px] font-medium text-[#3F3E3E]">Password</h3>
            <p className="text-[14px] font-normal text-[#767676]">Strengthen your account with a secure password.</p>
          </div>
          <div className="flex justify-between lg:justify-end items-center gap-2">
            <div className="font-mono flex items-center mt-1 text-[16px]">***************</div>
            <button className="w-[56px] h-[36px] rounded-[8px] border border-[#D0D5DD] bg-white flex items-center justify-center text-[#344054] text-sm">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Active Sessions Section */}
      <div className="space-y-4 z-50">
        <div>
          <h3 className="text-[18px] font-medium text-[#3F3E3E]">Active Sessions Management</h3>
          <p className="text-[14px] text-[#767676]">Monitor and control your active sessions.</p>
        </div>

        <div className="max-w-[825px] rounded-[12px] border border-[#F1F1F1] bg-[#FAFAFA] p-1 flex flex-col">
        <div className="w-full max-w-[820px] border rounded-[10px] border-[#F1F1F1] bg-white">
          <div className="px-4 py-3 h-[69px] flex items-center gap-3 border-b border-[#F1F1F1]">
            <span className="text-[18px] font-medium text-[#3F3E3E]">Active Sessions</span>
            <span className="bg-[#F5E9EC] w-[51px] h-[22px] flex items-center justify-center text-[#9A2444] text-xs px-2 py-1 rounded-[16px]">2 Keys</span>
          </div>

          <div className="overflow-x-auto hidden-scrollbar">
            <table className="min-w-full">
              <thead className="w-full bg-[#FAFAFA] border-y border-[#EAECF0]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#919090] uppercase">Device Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#919090] uppercase">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#919090] uppercase">Last Active</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#919090] uppercase">IP Address</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F1F1]">
                {sessions.map((session, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-[#3F3E3E]">{session.deviceName}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-[#767676]">{session.location}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-[#767676]">{session.lastActive}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-[#767676]">{session.ipAddress}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm relative">
                      <button
                        onClick={() => handleDropdownClick(index)}
                        className="text-[#767676] hover:text-[#3F3E3E]"
                      >
                        <img src={more} alt="" className="" />
                      </button>

                      {activeDropdown === index && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[999]">
                          <div className="py-1">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-[#3F3E3E] hover:bg-gray-100"
                              onClick={() => {
                                // Handle secure account
                                setActiveDropdown(null)
                              }}
                            >
                              Secure Account
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => {
                                // Handle delete
                                setActiveDropdown(null)
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>

      {showVerification && (
        <TwoFactorVerification
          onClose={() => setShowVerification(false)}
          onSuccess={() => {
            setIs2FAEnabled(true)
            setShowVerification(false)
            setSuccessMessage("2FA is now enabled! Your account is more secure.")
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
          }}
        />
      )}

      {showDisableModal && (
        <DisableTwoFactorModal
          onClose={() => setShowDisableModal(false)}
          onConfirm={() => {
            setIs2FAEnabled(false)
            setShowDisableModal(false)
            setSuccessMessage("2FA disabled. You'll no longer need OTPs to log in.")
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
          }}
        />
      )}
    </div>
  )
}

export default SecuritySettings

