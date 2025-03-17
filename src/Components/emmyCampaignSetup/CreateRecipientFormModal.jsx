import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";
import Button from "../buttons/transparentButton";
import { useRecipients } from "../../redux/UseRecipient";
import PhoneNumberInput from "@/Components/PhoneNumberInput";

const CreateRecipientFormModal = ({ onClose, onOpen, setToast, toast }) => {
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);
  const { recipients, setRecipients } = useRecipients();

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (onOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOpen, onClose]);

  // Handle dragging down on mobile to close
  const handleDragStart = (e) => {
    if (!isMobile) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = { startY: clientY };
  };

  const handleDragMove = (e) => {
    if (!dragRef.current || !isMobile || !modalRef.current) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = clientY - dragRef.current.startY;

    if (delta > 100) {
      onClose();
      dragRef.current = null;
    } else {
      modalRef.current.style.transform = `translateY(${Math.max(0, delta)}px)`;
    }
  };

  const handleDragEnd = () => {
    if (!modalRef.current || !isMobile) return;
    modalRef.current.style.transform = "";
    dragRef.current = null;
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const isFormValid =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.phone;

  const showToast = (type, title, message) => {
    console.log("Toast triggered:", { type, title, message });
    setToast({ show: true, type, title, message });
    setTimeout(() => {
      setToast({ show: false, type: "", title: "", message: "" });
    }, 3000);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) return;

    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !nameRegex.test(formData.firstName) ||
      !nameRegex.test(formData.lastName)
    ) {
      showToast(
        "error",
        "Validation Error",
        "First name and last name should only contain letters."
      );
      return;
    }

    if (!emailRegex.test(formData.email)) {
      showToast(
        "error",
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    const isDuplicate = recipients.some(
      (recipient) =>
        (recipient.firstName.toLowerCase() ===
          formData.firstName.toLowerCase() &&
          recipient.lastName.toLowerCase() ===
            formData.lastName.toLowerCase()) ||
        recipient.email.toLowerCase() === formData.email.toLowerCase() ||
        recipient.phone === formData.phone
    );

    if (isDuplicate) {
      showToast(
        "error",
        "Duplicate Entry",
        "This recipient is already in your list. Avoid duplicates to streamline delivery."
      );
      return;
    }

    const newRecipient = {
      id: recipients.length + 1,
      ...formData,
    };

    setRecipients([...recipients, newRecipient]);
    setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    onClose();
    showToast("success", "Success", "Recipient added successfully!");
  };

  if (!onOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`fixed bg-white overflow-y-scroll hide-scrollBar ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[40px] p-3"
            : "top-4 bottom-4 right-3 w-[517px] rounded-[30px] p-[22px]"
        }`}
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
        onTouchMove={handleDragMove}
        onMouseMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseUp={handleDragEnd}
      >
        {isMobile && (
          <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mt-4" />
        )}
        <div className="flex flex-col justify-between h-full gap-5">
          <div>
            <div>
              <h2 className="text-[#1A1A1A] text-[18px] font-medium">
                Enter Contact Manually
              </h2>
              <p className="text-[#767676] text-[14px] font-normal max-w-[95%] md:w-full">
                Add recipient one by one for quick updates or smaller campaigns
              </p>
            </div>
            <div>
              <label className="flex flex-col gap-2">
                <p className="text-[14px] font-medium text-[#1A1A1A]">
                  First Name
                </p>
                <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
                  <img
                    src={Icons.profile}
                    alt="first name"
                    className="signin-icons"
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-[14px] font-medium text-[#1A1A1A]">
                  Last Name
                </p>
                <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
                  <img
                    src={Icons.profile}
                    alt="last name"
                    className="signin-icons"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-[14px] font-medium text-[#1A1A1A]">Email</p>
                <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
                  <img
                    src={Icons.smsIcon}
                    alt="email"
                    className="signin-icons"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-[14px] font-medium text-[#1A1A1A]">
                  Phone Number
                </p>

                <PhoneNumberInput
                  country={"ng"}
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: value, // Use value directly instead of e.target.value
                    }))
                  }
                />
              </label>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              label="Cancel"
              onClick={onClose}
              className="rounded-[8px] border hover:bg-[#eeeff0] border-[#383268] text-[#383268]"
            />
            <Button
              label="Add Contact"
              disabled={isFormValid}
              onClick={handleSubmit}
              className="rounded-[8px] border border-[#C1BFDO] text-white bg-[#383268] hover:bg-[#41397c]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipientFormModal;
