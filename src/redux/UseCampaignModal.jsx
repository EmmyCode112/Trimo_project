import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const CampaignModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [FormModal, setOpenFormModal] = useState(false);
  const [openWhatsAppModal, setOpenWhatsAppModal] = useState(false);
  const [openEMailModal, setOpenEMailModal] = useState(false);

  const openCampaignModal = () => setOpenModal(true);
  const closeCampaignModal = () => setOpenModal(false);
  const toggleCampaignModal = () => setOpenModal((prev) => !prev);
  const openFormModal = () => setOpenFormModal(true);
  const closeFormModal = () => setOpenFormModal(false);
  const [campaignName, setCampaignName] = useState("");
  const onCloseWhatsAppModal = () => setOpenWhatsAppModal(false);
  const openWhatsFormModal = () => setOpenWhatsAppModal((prev) => !prev);
  const onCloseEMailModal = () => setOpenEMailModal(false);
  const openEMailFormModal = () => setOpenEMailModal((prev) => !prev);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        openCampaignModal,
        closeCampaignModal,
        toggleCampaignModal,
        FormModal,
        openFormModal,
        closeFormModal,
        campaignName,
        setCampaignName,
        openWhatsAppModal,
        onCloseWhatsAppModal,
        openWhatsFormModal,
        openEMailModal,
        onCloseEMailModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Use lowercase for hooks
export const useModal = () => {
  const context = useContext(ModalContext);
  console.log("useModal context:", context);
  if (!context) {
    throw new Error("useModal must be used within a CampaignModalProvider");
  }
  return context;
};
