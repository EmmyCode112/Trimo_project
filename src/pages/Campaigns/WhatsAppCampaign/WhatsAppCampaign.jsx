import { useState, useEffect } from "react";
import CreateRecipientFormModal from "@/Components/emmyCampaignSetup/CreateRecipientFormModal";
import RecipientTable from "@/Components/emmyCampaignSetup/RecipientTable";
import { useRecipients } from "../../../redux/UseRecipient";
import DeleteRecipientModal from "@/Components/emmyCampaignSetup/DeleteRecipientModal";
import ImportContact from "@/Components/emmyCampaignSetup/ImportContact";
import AvailableGroupModal from "@/Components/emmyCampaignSetup/AvailableGroupModal";

import { useModal } from "../../../redux/UseCampaignModal";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/buttons/transparentButton";
import { Icons } from "../../../assets/assets";
import Toast from "@/Components/Alerts/Toast";

const WhatsAppCampaign = () => {
  const { recipients, setRecipients } = useRecipients();
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDeleteRecipient, setOpenDeleteRecipient] = useState(false);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);
  const [importModal, setImportModal] = useState(false);
  const [importFromGroup, setImportFromGroup] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
  });

  const handleClickCsv = () => {
    setImportModal(true);
  };

  const [isNext, setIsNext] = useState(false);
  const { campaignName } = useModal();
  const navigate = useNavigate();

  const openDeleteModal = (id) => {
    setSelectedRecipientId(id);
    setOpenDeleteRecipient(true);
  };

  const handlePrevious = () => {
    if (campaignName.trim()) {
      //   const formattedName = formatCampaignName(campaignName);
      navigate(`/campaigns/${campaignName}`);
    }
  };

  const handleDelete = () => {
    if (selectedRecipientId !== null) {
      setRecipients((prevRecipients) =>
        prevRecipients.filter(
          (recipient) => recipient.id !== selectedRecipientId
        )
      );
      setOpenDeleteRecipient(false);
      setSelectedRecipientId(null);
    }
  };

  const data = recipients;

  const NextButtonDisabled = data.length === 0;
  // Handle Next Button Click
  const handleNext = () => {
    if (!NextButtonDisabled) {
      navigate("/campaigns/WhatsApp-campaign/create");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-[31px] py-[32px] flex flex-col gap-[22px]">
      <div className="flex justify-between items-center flex-wrap gap-[20px]">
        <header>
          <h1 className="text-[#1A1A1A] text-[24px] font-medium mb-[5px]">
            Add Rour Recipients
          </h1>
          <p className="text-[#767676] font-normal text-[15px]">
            Easily upload, enter, or organize your contact list for smooth
            campaign delivery.
          </p>
        </header>
        <div className="flex gap-3 justify-end self-end">
          <Button
            label="previous"
            className="text-[#383268] hover:bg-[] rounded-[8px] py-2 px-[18px] border-[#383268]"
            onClick={handlePrevious}
          />
          <Button
            disabled={NextButtonDisabled}
            label="Next"
            className="rounded-[8px] border-[#C1BFDO] text-white bg-[#383268] hover:bg-[#41397c]"
            onClick={handleNext}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <div
          className="max-sm:w-full py-[18px] px-[22px] rounded-[10px] bg-[#FAFAFA] border border-[#F1F1F1] lg:w-[317px] cursor-pointer"
          onClick={handleClickCsv}
        >
          <h2 className="text-normal font-medium text-[1A1A1A]">Upload Csv</h2>
          <p className="text-[#767676] text-[14px] font-normal">
            Quickly import your recipient list with a CSV file for efficient
            setup.
          </p>
        </div>
        <div
          className="max-sm:w-full py-[18px] px-[22px] rounded-[10px] bg-[#FAFAFA] border border-[#F1F1F1] lg:w-[317px] cursor-pointer"
          onClick={() => setOpenFormModal(true)}
        >
          <h2 className="text-normal font-medium text-[1A1A1A]">
            Manual Contact Entry
          </h2>
          <p className="text-[#767676] text-[14px] font-normal">
            Send messages to your regular contacts in a single click.
          </p>
        </div>
        <div
          className="max-sm:w-full py-[18px] px-[22px] rounded-[10px] bg-[#FAFAFA] border border-[#F1F1F1] lg:w-[317px] cursor-pointer"
          onClick={() => setImportFromGroup(true)}
        >
          <h2 className="text-normal font-medium text-[1A1A1A]">
            Select Contact Groups
          </h2>
          <p className="text-[#767676] text-[14px] font-normal">
            Send messages to your regular contacts in a single click.
          </p>
        </div>
      </div>

      <div>
        <RecipientTable
          openFormModal={() => setOpenFormModal(true)}
          openDeleteModal={openDeleteModal}
          setImportModal={setImportModal}
        />
      </div>

      {openFormModal && (
        <CreateRecipientFormModal
          onClose={() => setOpenFormModal(false)}
          onOpen={openFormModal}
        />
      )}

      {openDeleteRecipient && (
        <DeleteRecipientModal
          onClose={() => setOpenDeleteRecipient(false)}
          isOpenDeleteModal={() => setOpenDeleteRecipient(false)}
          onDelete={handleDelete}
        />
      )}
      {importModal && (
        <ImportContact
          isOpen={importModal}
          onClose={() => setImportModal(false)}
          contacts={recipients}
          setContacts={setRecipients}
        />
      )}

      {importFromGroup && (
        <AvailableGroupModal
          openAvailableGroups={importFromGroup}
          onClose={() => setImportFromGroup(false)}
          toast={toast}
          setToast={setToast}
        />
      )}

      {toast.show && (
        <Toast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false })}
        />
      )}
    </div>
  );
};

export default WhatsAppCampaign;
