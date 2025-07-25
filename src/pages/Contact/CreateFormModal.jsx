import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";
import { useContacts } from "@/redux/ContactProvider/UseContact";

const CreateFormModal = ({
  isOpenModal,
  onClose,
  onSubmit,
  contacts,
  setFormData,
  formData,
}) => {
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);
  const {
    createContactLoading,
    createContactError,
    createContactErrorMessage,
    setCreateContactErrorMessage,
  } = useContacts();

  // Reset form when modal opens
  useEffect(() => {
    if (isOpenModal) {
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
      });
      setCreateContactErrorMessage("");
    }
  }, [isOpenModal, setFormData]);

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

  const isFormIncomplete =
    !formData.firstname ||
    !formData.lastname ||
    !formData.email ||
    !formData.phone_number;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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

        <div className="flex flex-col justify-between h-full">
          <div>
            <div>
              <h2 className="font-medium text-[18px] text-[#1A1A1A] mb-[6px]">
                Enter Contact Manually
              </h2>
              <p className="text-[14px] font-normal text-[#767676]">
                Add recipients one by one for quick updates or smaller
                campaigns.
              </p>
            </div>
            <form className="mt-[28px] flex flex-col gap-[20px] h-full">
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
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
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
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <p className="text-[14px] font-medium text-[#1A1A1A]">
                    Email
                  </p>
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
                      onChange={handleChange}
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
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                    />
                  </div>
                </label>
              </div>
              <div>
                {createContactErrorMessage && (
                  <p className="text-red-500 text-sm mb-4">
                    {createContactErrorMessage}
                  </p>
                )}
              </div>
            </form>
          </div>

          <div className="self-end align-end flex items-center gap-3">
            <Button
              label="Cancel"
              onClick={onClose}
              className="rounded-[8px] border border-[#C1BFDO] hover:bg-[#eeeff0]"
            />
            <Button
              label={
                <p>
                  {createContactLoading ? (
                    <div className="flex items-center gap-2 opacity-[.7]">
                      <div className="spinner"></div>Adding...
                    </div>
                  ) : (
                    "Add Contact"
                  )}
                </p>
              }
              onClick={onSubmit}
              disabled={isFormIncomplete}
              className={`rounded-[8px] border border-[#C1BFDO] bg-[#383268] hover:bg-[#41397c] text-white`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFormModal;
