import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";

const CreateFormModal = ({ isOpenModal, onClose, onSubmit, contacts }) => {
  const [error, setError] = useState(false);
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpenModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenModal, onClose]);

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

  if (!isOpenModal) return null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    group: "N/A", // Default group
  });

  // Check if any field is empty
  const isFormIncomplete =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.phone;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const duplicate = contacts.some(
      (contact) =>
        contact.email === formData.email || contact.phone === formData.phone
    );

    if (duplicate) {
      setError(true);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px] ">
      <div
        ref={modalRef}
        className={`fixed bg-white overflow-y-scroll hide-scrollBar ${
          isMobile
            ? "inset-x-0 h-full bottom-0 rounded-t-[40px] p-3"
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
        <div className="flex flex-col">
          <div>
            <h2 className="font-medium text-[18px] text-[#1A1A1A] mb-[6px]">
              Enter Contact Manually
            </h2>
            <p className="text-[14px] font-normal text-[#767676]">
              Add recipients one by one for quick updates or smaller campaigns.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-[28px] flex flex-col gap-[20px] h-full"
          >
            <div className="flex flex-col gap-y-[18px] mb-[40px]">
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
                <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
                  <img
                    src={Icons.naira}
                    alt="country code"
                    className="signin-icons"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                  />
                </div>
              </label>
            </div>
            <div>
              {error && (
                <div className="flex bg-[#FBF1E6] items-start border border-[#E29133] gap-3 p-4 rounded-[8px]">
                  <img src={Icons.errorWarningIcon} alt="error" />
                  <div>
                    <p className="text-[#DB7500] text-[14px] font-medium">
                      Duplicate Entry
                    </p>
                    <p className="text-[#C76A00] text-[14px] font-normal">
                      This contact is already in your list. Avoid duplicates to
                      streamline delivery.
                    </p>
                  </div>
                  <img
                    src={Icons.closeXIcon}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setError(true)}
                  />
                </div>
              )}
            </div>
            <div className="self-end align-end flex items-center gap-3">
              <Button
                label="Cancel"
                onClick={onClose}
                className="rounded-[8px] border border-[#C1BFDO] hover:bg-[#eeeff0]"
              />
              <Button
                label="Add Contact"
                type="submit"
                disabled={isFormIncomplete}
                className={`rounded-[8px] border border-[#C1BFDO] bg-[#383268] hover:bg-[#41397c] text-white`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFormModal;
