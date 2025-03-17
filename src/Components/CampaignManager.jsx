import { useState } from "react";
import CreateCampaignFormModal from "../pages/Campaigns/SMSCampaign/CreateCampaignFormModal";
import CreateWhatsAppCampaignFormModal from "../pages/Campaigns/WhatsAppCampaign/CreateWhatsAppCampaignFormModal";
import { useModal } from "../redux/UseCampaignModal";

const CampaignManager = () => {
  const { FormModal, closeFormModal, openWhatsAppModal, onCloseWhatsAppModal } =
    useModal();

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
      </div>
    </div>
  );
};
export default CampaignManager;
