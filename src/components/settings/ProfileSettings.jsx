import { Edit } from "lucide-react";
import Button from "@/Components/buttons/transparentButton";

const ProfileSettings = ({ onEditClick }) => {
  const firstName = "Eric";
  const lastName = "Alfred";
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  return (
    <div className="space-y-[22px]">
      <div>
        <h2 className="text-[18px] text-[#3F3E3E] font-medium mb-3">My Profile</h2>
        <div className="flex items-center max-w-[392px] h-[118px] gap-[10px] justify-between rounded-lg">
          <div className="flex w-full items-center gap-[22px]">
            <div className="w-[68px] h-[68px] rounded-full bg-[#F1F1F1] flex items-center justify-center">
              <span className="text-[24px] font-bold text-[#383268]">{initials}</span>
            </div>
            <Button 
              label="Upload Profile" 
              className="w-[121px] flex items-center justify-center rounded-[8px] text-[#344054] h-[36px] text-[12px] whitespace-nowrap font-medium" 
            />
          </div>
        </div>
        <p className="text-[14px] font-normal text-[#767676] max-w-[392px]">
          Upload a clear photo to personalize your profile. Accepted formats: JPG, PNG, max size: 5MB.
        </p>
      </div>

      {/* Personal Information */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] whitespace-nowrap text-[#3F3E3E] font-medium">Manage Personal Information</h2>
          <button 
            className="hidden lg:flex w-[101px] text-[#344054] h-[36px] px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-[12px] justify-center items-center bg-white hover:bg-gray-100" 
            onClick={onEditClick}
          >
            Edit Profile
          </button>
          <button className="lg:hidden p-2 rounded-full hover:bg-gray-100" onClick={onEditClick}>
            <Edit className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="space-y-2 w-1/2">
              <label className="label">First Name</label>
              <input type="text" value={firstName} readOnly className="input" />
            </div>
            <div className="space-y-2 w-1/2">
              <label className="label">Last Name</label>
              <input type="text" value={lastName} readOnly className="input" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="label">Email Address</label>
            <input
              type="email"
              value="owaiowai@gmail.com"
              readOnly
              className="input"
            />
          </div>
          <div className="space-y-2">
            <label className="label">Phone number</label>
            <div className="flex input">
              <input 
                type="text" 
                value="NG" 
                readOnly 
                className="w-[51px] flex items-center justify-center text-center py-2 border-none outline-none bg-transparent" 
              />
              <input
                type="text"
                value="+234 (081) 109-48088"
                readOnly
                className="bg-transparent py-2 border-none outline-none bg-"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;