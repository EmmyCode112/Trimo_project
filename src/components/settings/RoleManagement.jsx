import { useState } from "react"
import { MoreHorizontal, ChevronDown, Pencil, Trash2 } from "lucide-react"
import AddRoleModal from "./AddRoleModal"
import DeleteRoleModal from "./DeleteRoleModal"
import SuccessAlert from "../Alerts/SuccessAlert"

const RoleManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [activeDropdown, setActiveDropdown] = useState(null)

  const roles = [
    {
      id: 1,
      name: "Admin",
      type: "full",
      permissions: ["Full Access"],
    },
    {
      id: 2,
      name: "Sub-Admin",
      type: "custom",
      permissions: ["Campaign Management", "Wallet Transactions", "User Management"],
    },
    {
      id: 3,
      name: "Regular User",
      type: "custom",
      permissions: ["Campaign Management", "Wallet Transactions", "User Management"],
    },
    {
      id: 4,
      name: "API User",
      type: "custom",
      permissions: ["Campaign Management", "Wallet Transactions", "User Management"],
    },
  ]

  const handleDropdownClick = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  const handleEditRole = (role) => {
    setSelectedRole(role)
    setShowAddModal(true)
    setActiveDropdown(null)
  }

  const handleDeleteRole = (role) => {
    setSelectedRole(role)
    setShowDeleteModal(true)
    setActiveDropdown(null)
  }

  return (
    <div className="space-y-6">
      {showSuccess && <SuccessAlert message={successMessage} onClose={() => setShowSuccess(false)} />}

      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-medium text-[#1A1A1A]">Role & Permission Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#383268] text-white px-4 py-2 rounded-lg hover:bg-[#2a2a5a] text-[14px]"
        >
          Add New Role
        </button>
      </div>

      <div className="border rounded-[10px] border-[#F1F1F1] bg-white">
        <div className="px-6 py-4 border-b border-[#F1F1F1]">
          <div className="flex items-center gap-2">
            <h3 className="text-[16px] font-medium text-[#1A1A1A]">Roles</h3>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
              {roles.length} Role{roles.length !== 1 ? "s" : ""}
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
                    Role Name
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#767676] uppercase">
                  Assigned Permissions
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="border-b border-[#F1F1F1]">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-[14px] text-[#1A1A1A]">{role.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            permission === "Full Access" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() => handleDropdownClick(role.id)}
                      className="text-[#767676] hover:text-[#1A1A1A]"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>

                    {activeDropdown === role.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[1000]">
                        <div className="py-1">
                          <button
                            className="flex w-full items-center px-4 py-2 text-sm text-[#1A1A1A] hover:bg-gray-100"
                            onClick={() => handleEditRole(role)}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Info
                          </button>
                          <button
                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => handleDeleteRole(role)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
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

      <AddRoleModal
        open={showAddModal}
        role={selectedRole}
        onClose={() => {
          setShowAddModal(false)
          setSelectedRole(null)
        }}
        onSuccess={(message) => {
          setSuccessMessage(message)
          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 3000)
        }}
      />

      <DeleteRoleModal
        open={showDeleteModal}
        role={selectedRole}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedRole(null)
        }}
        onConfirm={() => {
          setSuccessMessage("Role deleted successfully")
          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 3000)
          setShowDeleteModal(false)
          setSelectedRole(null)
        }}
      />
    </div>
  )
}

export default RoleManagement

