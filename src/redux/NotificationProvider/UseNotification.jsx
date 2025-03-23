import { createContext, useContext, useState } from "react";
import { Icons } from "@/assets/assets";

const notificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications] = useState([
    {
      type: "Low Balance",
      message:
        "Low balance detected. Add credits in Wallet to avoid campaign interruptions.",
      action: "Add Credit",
      icon: Icons.warningIcon,
      textColor: "#81740E",
      bgColor: "#FDFBEC",
    },
    {
      type: "Failed Message Alert",
      message: "High delivery failure rate on Campaign XYZ",
      action: "View Details",
      icon: Icons.warningIcon,
      textColor: "#BD1000",
      bgColor: "#FFF3F2",
    },
    {
      type: "Inactive Campaigns",
      message: "It’s been a while since your last campaign",
      action: "Start Campaign",
      icon: Icons.pendingIcon,
      textColor: "#121212",
      bgColor: "#F1F1F1",
    },
    {
      type: "Account Security",
      message:
        "Unusual account activity detected! Check your security settings to safeguard your account.",
      action: "Review Security",
      icon: Icons.keyIcon,
      textColor: "#000000",
      bgColor: "#E3F2FD",
    },
  ]);

  return (
    <notificationContext.Provider value={{ notifications }}>
      {children}
    </notificationContext.Provider>
  );
};

export const useNotification = () => useContext(notificationContext);
