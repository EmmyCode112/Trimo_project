import { useState } from "react";
import "./NotificationTableStyles.css";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";

const NotificationAlert = () => {
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
    <container className="dashboard-table-container">
      <div className="w-full rounded-[15px] py-[20px] px-[20px] flex flex-col gap-[20px] shadow-md border">
        <h2 className="text-[#3F3E3E] text-[18px] font-medium">
          Notification & Alert
        </h2>

        <div className="w-full overflow-x-scroll hide-scrollBar">

        <table className="rounded-[8px] whitespace-nowrap">
          <thead>
            <tr className="bg-[#F9FAFB] py-3 border-b border-top-radius border-b-[#EAECF0]">
              <th className="px-[12px] py-3 text-[13px] font-medium text-[#767676]">
                Alert Type
              </th>
              <th className="px-[12px] py-3 text-[13px] font-medium text-[#767676]">
                Message
              </th>
              <th className="px-[12px] py-3 text-[13px] font-medium text-[#767676]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <tr key={index} className="py-4 border-t border-t-[#EAECF0]">
                  <td>
                    <p
                      className="text-xs font-medium py-1 px-2 rounded-[16px] w-[110px] whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{
                        color: notification.textColor,
                        backgroundColor: notification.bgColor,
                      }}
                    >
                      {notification.type}
                    </p>
                  </td>
                  <td className="flex items-center gap-[10px]">
                    <img
                      src={notification.icon}
                      alt="icon"
                      className="w-40px h-[40px]"
                    />
                    <p className="text-[13px] font-medium text-[#1A1A1A] w-full text-ellipsis overflow-hidden">
                      {notification.message}
                    </p>
                  </td>
                  <td>
                    <Button
                      label={notification.action}
                      className="py-[10px] px-[16px] text-[#344054] rounded-[8px] border border-[#D0D5DD] hover:bg-[#eeeff0] text-[13px] w-[140px]"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-8">
                  <div className="flex flex-col items-center">
                    <img
                      src={Icons.emptyState}
                      alt="No data"
                      className="w-14 h-14 mb-4"
                    />
                    <p className="text-lg font-medium text-[#3F3E3E]">
                      No Notifications or Alerts
                    </p>
                    <p className="text-[#767676] text-sm">
                      {
                        "You're all caught up! There are no notifications or alerts at the moment."
                      }
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </container>
  );
};

export default NotificationAlert;
