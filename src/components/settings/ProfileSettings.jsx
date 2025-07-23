import { useEffect, useRef, useState } from "react";
import { Edit } from "lucide-react";
import Button from "@/Components/buttons/transparentButton";
import api from "@/services/api"; // Your Axios instance

const ProfileSettings = ({ onEditClick }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const firstName = "Eric";
  const lastName = "Alfred";
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const [toast, setToast] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
  });

  const showToast = (type, title, message) => {
    console.log("Toast triggered:", { type, title, message });
    setToast({ show: true, type, title, message });
    setTimeout(() => {
      setToast({ show: false, type: "", title: "", message: "" });
    }, 5000);
  };

  // Fetch profile image when uploadedFileName changes
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!uploadedFileName) return;

      const token = localStorage.getItem("authToken");

      try {
        const encodedFileName = encodeURIComponent(uploadedFileName);
        const response = await fetch(
          `${baseUrl}/user/get-image/${encodedFileName}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "image/*", // Expect image content
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        console.log("Fetched image URL:", imageUrl);

        setProfilePreview(imageUrl);
        setHasImage(true);
      } catch (err) {
        console.error("Failed to fetch profile image:", err);
        setHasImage(false);
        alert(`Failed to fetch profile image: ${err.message}`);
      }
    };

    fetchProfileImage();

    return () => {
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [uploadedFileName]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type client-side
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PNG, JPG, or JPEG file.");
      return;
    }

    // Revoke old blob URL if it exists
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview);
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("image_name", file); // Only send image_name as the file

    // Debug FormData contents
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value, `Type: ${value.type}, Name: ${value.name}`);
    }

    try {
      const res = await api.post(`${baseUrl}/user/profile-image`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      const previewUrl = URL.createObjectURL(file);
      setProfilePic(file);
      setProfilePreview(previewUrl);
      setUploadedFileName(file.name); // Update uploadedFileName for fetching
      setHasImage(true);
      showToast(
        "success",
        "Uploaded successfully.",
        "Your profile picture as been uploaded successfully"
      );

      console.log("Profile image uploaded successfully:", res.data);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      showToast(
        "error",
        "Uploaded Failed.",
        `${
          "Failed to upload profile image" +
            error.response?.data?.err_msg?.image_name?.[0] ||
          "Please try again."
        } `
      );
      alert(
        `Failed to upload profile image: ${
          error.response?.data?.err_msg?.image_name?.[0] || "Please try again."
        }`
      );
    }
  };

  // useEffect(() => {
  //   const testUpload = async () => {
  //     // Step 1: Create a valid dummy file
  //     const file = new File(["dummy content"], "test-image.png", {
  //       type: "image/png",
  //     });

  //     // Step 2: Prepare FormData
  //     const formData = new FormData();
  //     // formData.append("profileImage", file);
  //     formData.append("image_name", file.name); // String: "test-image.png"
  //     // formData.append("profileName", "eric-alfred"); // Only include if required

  //     // Debug FormData contents
  //     for (const [key, value] of formData.entries()) {
  //       console.log(`${key}:`, value);
  //     }

  //     try {
  //       const res = await api.post(`${baseUrl}/user/profile-image`, formData);
  //       console.log("Upload successful:", res.data);
  //     } catch (err) {
  //       console.error("Upload failed:", err.response?.data || err.message);
  //     }
  //   };

  //   testUpload();
  // }, []);

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-[22px]">
      <div>
        <h2 className="text-[18px] text-[#3F3E3E] font-medium mb-3">
          My Profile
        </h2>
        <div className="flex items-center max-w-[392px] h-[118px] gap-[10px] justify-between rounded-lg">
          <div className="flex w-full items-center gap-[22px]">
            <div className="w-[68px] h-[68px] rounded-full bg-[#F1F1F1] overflow-hidden flex items-center justify-center">
              {hasImage && profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  onError={() => {
                    setHasImage(false);
                    setProfilePreview(null); // Reset preview on error
                  }}
                />
              ) : (
                <span className="text-[24px] font-bold text-[#383268]">
                  {initials}
                </span>
              )}
            </div>

            <Button
              label={hasImage ? "Edit Profile" : "Upload Profile"}
              className="w-[121px] flex items-center justify-center rounded-[8px] text-[#344054] h-[36px] text-[12px] whitespace-nowrap font-medium"
              onClick={triggerUpload}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <p className="text-[14px] font-normal text-[#767676] max-w-[392px]">
          Upload a clear photo to personalize your profile. Accepted formats:
          JPG, PNG, max size: 5MB.
        </p>
      </div>

      {/* Personal Info */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] whitespace-nowrap text-[#3F3E3E] font-medium">
            Manage Personal Information
          </h2>
          <button
            className="hidden lg:flex w-[101px] text-[#344054] h-[36px] px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-[12px] justify-center items-center bg-white hover:bg-gray-100"
            onClick={onEditClick}
          >
            Edit Profile
          </button>
          <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={onEditClick}
          >
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
                className="bg-transparent py-2 border-none outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {toast.show && (
        <Toast type={toast.type} title={toast.title} message={toast.message} />
      )}
    </div>
  );
};

export default ProfileSettings;
