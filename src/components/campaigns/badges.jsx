export const MessageTypeBadge = ({ type }) => {
    const colors = {
      SMS: "bg-blue-100 text-blue-700",
      Email: "bg-yellow-100 text-yellow-700",
      OTP: "bg-pink-100 text-pink-700",
      WhatsApp: "bg-green-100 text-green-700",
    }
  
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[type]}`}>{type}</span>
  }
  
  export const StatusBadge = ({ status }) => {
    const colors = {
      Sent: "bg-green-100 text-green-700",
      Scheduled: "bg-orange-100 text-orange-700",
      Ongoing: "bg-purple-100 text-purple-700",
      Draft: "bg-gray-100 text-gray-700",
    }
  
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>{status}</span>
  }
  
  