import { useState } from "react";
import CreateCampaignFormModal from "./CreateCampaignFormModal";
import { useModal } from "../../../redux/UseCampaignModal";

const SmsCampaignManager = () => {
  const {FormModal, closeFormModal, } = useModal();

  return (
    <div>
      {FormModal && (
        <CreateCampaignFormModal
          onClose={closeFormModal}
          onOpen={FormModal}
        />
      )}
    </div>
  );
};
export default SmsCampaignManager;
