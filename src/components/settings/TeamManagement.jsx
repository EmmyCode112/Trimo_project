import { useState } from "react"
import { MoreHorizontal, ChevronDown } from "lucide-react"
import AddMemberModal from "./AddMemberModal"
import RemoveMemberModal from "./RemoveMemberModal"
import SuccessAlert from "../Alerts/SuccessAlert"

const TeamManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [activeDropdown, setActiveDropdown] = useState(null)

  const members = [
    {
      id: 1,
      name: "Owai Owai",
      email: "owaiowai@gmail.com",
      role: "Admin",
      lastActive: "04 Dec 2024 04:05 PM",
      status: "active",
    },
    {
      id: 2,
      name: "Jsme Victor",
      email: "owaiowai@gmail.com",
      role: "Sub-Admin",
      lastActive: "",
      status: "pending",
    },
    {
      id: 3,
      name: "Sarah Isong",
      email: "owaiowai@gmail.com",
      role: "Regular User",
      lastActive: "04 Dec 2024 04:05 PM",
      status: "active",
    },
  ]

  const handleDropdownClick = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  const handleEditMember = (member) => {
    setSelectedMember(member)
    setShowAddModal(true)
    setActiveDropdown(null)
  }

  const handleRemoveMember = (member) => {
    setSelectedMember(member)
    setShowRemoveModal(true)
    setActiveDropdown(null)
  }

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case "Admin":
        return "bg-blue-100 text-blue-700"
      case "Sub-Admin":
        return "bg-purple-100 text-purple-700"
      case "Regular User":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {showSuccess && <SuccessAlert message={successMessage} onClose={() => setShowSuccess(false)} />}

      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-medium text-[#1A1A1A]">Team Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#383268] text-white px-4 py-2 rounded-lg hover:bg-[#2a2a5a] text-[14px]"
        >
          Add Team Member
        </button>
      </div>

      <div className="border rounded-[10px] border-[#F1F1F1] bg-white">
        <div className="px-6 py-4 border-b border-[#F1F1F1]">
          <div className="flex items-center gap-2">
            <h3 className="text-[16px] font-medium text-[#1A1A1A]">Team Members</h3>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
              {members.length} Member{members.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-[#F1F1F1]">
                <th className="w-8 px-6 py-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left">
                  <button className="flex items-center text-xs font-medium text-[#767676] uppercase">
                    Name
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#767676] uppercase">Assigned Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#767676] uppercase">Last Active</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b border-[#F1F1F1]">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-[14px] text-[#1A1A1A]">{member.name}</div>
                      <div className="text-[14px] text-[#767676]">{member.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyle(member.role)}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {member.status === "pending" ? (
                      <span className="text-orange-500 text-sm">Pending</span>
                    ) : (
                      <span className="text-sm text-[#767676]">{member.lastActive}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() => handleDropdownClick(member.id)}
                      className="text-[#767676] hover:text-[#1A1A1A]"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>

                    {activeDropdown === member.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[1000]">
                        <div className="py-1">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-[#1A1A1A] hover:bg-gray-100"
                            onClick={() => handleEditMember(member)}
                          >
                            Edit Info
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => handleRemoveMember(member)}
                          >
                            Remove User
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

      <AddMemberModal
        open={showAddModal}
        member={selectedMember}
        onClose={() => {
          setShowAddModal(false)
          setSelectedMember(null)
        }}
        onSuccess={(message) => {
          setSuccessMessage(message)
          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 3000)
        }}
      />

      <RemoveMemberModal
        open={showRemoveModal}
        member={selectedMember}
        onClose={() => {
          setShowRemoveModal(false)
          setSelectedMember(null)
        }}
        onConfirm={() => {
          setSuccessMessage("Team member removed successfully")
          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 3000)
          setShowRemoveModal(false)
          setSelectedMember(null)
        }}
      />
    </div>
  )
}

export default TeamManagement

