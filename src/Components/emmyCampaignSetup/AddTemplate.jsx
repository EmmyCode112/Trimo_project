import React, { useState, useEffect, useRef } from "react";
import Button from "../buttons/transparentButton";
import { Icons } from "@/assets/assets";
import Toast from "@/Components/Alerts/Toast";
import TemplateList from "./TemplateList";
import ConfirmModal from "./ConfirmModal";

import { useDispatch, useSelector } from "react-redux";
import {
  setImageUrl,
  setTemplateImage,
  setUploadedImage,
} from "@/redux/imageSlice";

const AddTemplate = ({ setImageSrc }) => {
  const [enabled, setEnabled] = useState(false);
  const [openTemplateList, setOpemTemplateList] = useState(false);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const imageUrl = useSelector((state) => state.image.imageUrl);
  const uploadedImage = useSelector((state) => state.image.uploadedImage);
  const templateImage = useSelector((state) => state.image.templateImage);

  const [selectedTemplate, setSelectedTemplate] = useState({
    selectedTemplateName: "",
    selectedTemplateImage: null,
  });
  const [image, setImage] = useState(null);
  const templateRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (templateRef.current && !templateRef.current.contains(event.target)) {
        setOpemTemplateList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openTemplateList]);

  const handleConfirm = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setPendingAction(null);
    setIsModalOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageLink = URL.createObjectURL(file);

      if (templateImage || imageUrl) {
        setPendingAction(() => () => {
          setImage(imageLink);
          dispatch(setUploadedImage(imageLink));
          dispatch(setTemplateImage(null));
          dispatch(setImageUrl(""));
          setSelectedTemplate({
            selectedTemplateName: "",
            selectedTemplateImage: null,
          });
        });
        setIsModalOpen(true);
        return;
      }

      setImage(imageLink);
      dispatch(setUploadedImage(imageLink));
      dispatch(setTemplateImage(null));
      dispatch(setImageUrl(""));
      setSelectedTemplate({
        selectedTemplateName: "",
        selectedTemplateImage: null,
      });

      console.log("Uploaded Image:", imageLink); // Check if imageUrl is correct
    }
  };

  const handleTemplateSelect = (template) => {
    if (image || imageUrl) {
      setPendingAction(() => () => {
        setSelectedTemplate({
          selectedTemplateName: template.name,
          selectedTemplateImage: template.icon,
        });
        dispatch(setTemplateImage(template.icon));
        dispatch(setUploadedImage(null));
        dispatch(setImageUrl(""));
        setImage("");
        setOpemTemplateList(false);
      });
      setIsModalOpen(true);
      return;
    }

    setSelectedTemplate({
      selectedTemplateName: template.name,
      selectedTemplateImage: template.icon,
    });
    dispatch(setTemplateImage(template.icon));
    setOpemTemplateList(false);
    dispatch(setUploadedImage(null));
    dispatch(setImageUrl(""));
    setImage("");
  };

  const [toast, setToast] = useState(null);

  const handleImageUrlChange = (event) => {
    const url = event.target.value;

    if (image || templateImage) {
      setPendingAction(() => () => {
        dispatch(setImageUrl(url));
        dispatch(setUploadedImage(null));
        dispatch(setTemplateImage(null));
        setSelectedTemplate({
          selectedTemplateName: "",
          selectedTemplateImage: null,
        });
        setImage("");
      });
      setIsModalOpen(true);
      return;
    }

    dispatch(setImageUrl(url));
    dispatch(setUploadedImage(null));
    dispatch(setTemplateImage(null));
    setSelectedTemplate({
      selectedTemplateName: "",
      selectedTemplateImage: null,
    });
    setImage("");
    const img = new Image();
    img.src = url;

    img.onload = () => {
      setToast({
        type: "success",
        title: "Upload Successful",
        message: "Image loaded successfully!",
      });
    };

    img.onerror = () => {
      setToast({
        type: "error",
        title: "Upload Failed",
        message: "Invalid image URL!",
      });
      dispatch(setImageUrl(""));
    };
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    console.log("Uploaded Image Updated:", uploadedImage);
  }, [uploadedImage]);

  return (
    <div className="flex flex-col gap-y-[18px] w-full">
      <div className="flex flex-col gap-y-[6px] w-full">
        <div className="flex justify-between gap-2 items-center max-md:flex-wrap w-full">
          <p>Select Template Message</p>

          <div>
            <Button
              label="Add New Template"
              className="rounded-[8px] border border-[#383268] hover:bg-[#383268] hover:text-white text-[#383268]"
            />
          </div>
        </div>

        <div
          ref={templateRef}
          className="w-full border-[#D0D5DD] border rounded-[8px] py-[10px] px-[14px] cursor-pointer relative max-sm:mt-5"
        >
          <div
            className="w-full flex justify-between items-center gap-2 "
            onClick={() => setOpemTemplateList((prev) => !prev)}
          >
            <p
              className={`text-[16px] font-normal ${
                selectedTemplate.selectedTemplateName
                  ? "text-[#1A1A1A]"
                  : "text-[#919191]"
              }`}
            >
              {selectedTemplate.selectedTemplateName || "Select template"}
            </p>
            <img src={Icons.arrowDown} alt="select" />
          </div>
          {openTemplateList && <TemplateList onSelect={handleTemplateSelect} />}
        </div>

        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex gap-x-[10px] items-center mt-3">
            <p className="text-[#484848] text-[14px] font-normal">
              Add a different header
            </p>
            <div
              className={`w-10 h-5 flex items-center  rounded-full p-1 cursor-pointer transition-all duration-200 ${
                enabled ? "bg-[#383268]" : "bg-[#E4E7EC]"
              }`}
              onClick={() => setEnabled((prev) => !prev)}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-200 ${
                  enabled ? "translate-x-[16px]" : ""
                }`}
              ></div>
            </div>
          </div>
          {enabled && (
            <div className="flex items-center gap-6 mt-4 w-full max-sm:flex-col">
              {/* Image Selector */}
              <div
                className="w-[90px] h-[90px] max-sm:w-[200px] basis-[120px] border border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
                onClick={handleImageClick}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={Icons.emptyTemplate}
                    alt="Upload"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex items-center gap-6  w-full  max-sm:flex-col">
                <p className="text-[#484848] text-[14px] font-normal">Or</p>

                <div className="flex flex-col gap-y-2 w-full">
                  <p className="text-[#344054] text-[14px] font-normal max-sm:text-center">
                    Provide the link to the new header image
                  </p>

                  <input
                    type="text"
                    placeholder="https://linkToImage.com/past_link_upload.png"
                    className="py-[10px] px-[14px] placeholder-[#A3A3A3] rounded-[8px] border border-[#D0D5DD] bg-none outline-[#383268] font-normal w-full text-sm"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        {isModalOpen && (
          <ConfirmModal
            onClose={handleCancel}
            isOpen={isModalOpen}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default AddTemplate;
