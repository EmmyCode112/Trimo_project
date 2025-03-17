import { useEffect, useState } from "react";
import Button from "@/Components/buttons/transparentButton";
import MessageEditor from "@/Components/emmyCampaignSetup/MessageEditor";
import SelectedRecipient from "@/Components/emmyCampaignSetup/SelectedRecipient";
import MessagePreview from "./MessagePreview";
import { useRecipients } from "@/redux/UseRecipient";
import ScheduleCampaign from "./ScheduleCampaign";
import CreationRecipientModal from "@/Components/emmyCampaignSetup/CreationRecipientModal";
import { useNavigate } from "react-router-dom";
import SmallScreen from "./SmallScreenPreviewPanel";

const WhatsAppMessageCreation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [imageSrc, setImageSrc] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { recipients } = useRecipients();
  const [message, setMessage] = useState({ header: "", description: "" });
  const [openFormModal, setOpenFormModal] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();
  const [smPreviewPanel, setSmPreviewPanel] = useState(false);

  const isMessageScheduled =
    schedule === "sendNow" ||
    (schedule === "scheduleLater" && selectedDate && selectedTime);

  const isScheduleEnabled =
    message.header.trim() !== "" && message.description.trim() !== "";

  console.log("parent component", imageSrc);
  return (
    <div className="px-[31px] py-[32px] flex flex-col gap-[22px]">
      <div className="flex justify-between items-center flex-wrap-reverse gap-[20px]">
        <header>
          <h1 className="text-[#1A1A1A] text-[24px] font-medium mb-[5px]">
            What message do you want to send?
          </h1>
          <p className="text-[#767676] font-normal text-[15px]">
            Add broadcast name and template below
          </p>
        </header>
        <div className="flex gap-3 justify-end self-end">
          <Button
            label="Previous"
            className="text-[#383268] hover:bg-[] rounded-[8px] py-2 px-[18px] border-[#383268]"
            onClick={() => navigate("/campaigns/smsCampaign")}
          />
          <Button
            label="Next"
            className="rounded-[8px] border-[#C1BFDO] text-white bg-[#383268] hover:bg-[#41397c]"
            disabled={!isMessageScheduled}
          />
        </div>
      </div>
      <div className="flex items-start gap-[45px]">
        <div className="flex flex-col gap-y-[25px] lg:w-2/3 w-full">
          <div>
            <MessageEditor
              customer={recipients}
              setMessage={setMessage}
              setImageSrc={setImageSrc}
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              isOpenPreviewPanel={() => setSmPreviewPanel(true)}
            />
          </div>
          <div>
            <SelectedRecipient openForm={() => setOpenFormModal(true)} />
          </div>
        </div>
        <div className="md:w-1/3 hidden lg:block overflow-hidden">
          <MessagePreview customer={recipients[0]} message={message} />
        </div>
      </div>
      <div>
        <ScheduleCampaign
          setSchedule={setSchedule}
          schedule={schedule}
          setSelectedDate={setSelectedDate}
          setSelectedTime={setSelectedTime}
          selectedTime={selectedTime}
          selectedDate={selectedDate}
          isDisabled={!isScheduleEnabled}
        />
      </div>

      {openFormModal && (
        <CreationRecipientModal
          onOpen={openFormModal}
          onClose={() => setOpenFormModal(false)}
        />
      )}

      {smPreviewPanel && (
        <SmallScreen
          message={message}
          onClose={() => setSmPreviewPanel(false)}
          isOpen={smPreviewPanel}
        />
      )}
    </div>
  );
};

export default WhatsAppMessageCreation;
