import { useState } from "react";
import CreateCampaignFormModal from "../pages/Campaigns/SMSCampaign/CreateCampaignFormModal";
import CreateWhatsAppCampaignFormModal from "../pages/Campaigns/WhatsAppCampaign/CreateWhatsAppCampaignFormModal";
import { useModal } from "../redux/UseCampaignModal";
import CampaignModal from "./CampaignModal";
const CampaignManager = () => {
  const {
    FormModal,
    closeFormModal,
    openWhatsAppModal,
    onCloseWhatsAppModal,
    openCampaignModal,
    openModal,
    closeCampaignModal,
  } = useModal();

  return (
    <div>
      {FormModal && (
        <CreateCampaignFormModal onClose={closeFormModal} onOpen={FormModal} />
      )}

      <div>
        {openWhatsAppModal && (
          <CreateWhatsAppCampaignFormModal
            onClose={onCloseWhatsAppModal}
            onOpen={openWhatsAppModal}
          />
        )}

        {openModal && (
          <CampaignModal
            onClose={closeCampaignModal}
            onOpen={openCampaignModal}
          />
        )}
      </div>
    </div>
  );
};
export default CampaignManager;
