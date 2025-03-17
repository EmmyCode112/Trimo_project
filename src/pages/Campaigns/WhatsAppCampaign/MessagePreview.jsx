import { Icons } from "@/assets/assets";
import "./WhatsAppCampaign.css";
import { useSelector } from "react-redux";

const MessagePreview = ({ message, customer }) => {
  const imageUrl = useSelector((state) => state.image.imageUrl);
  const uploadedImage = useSelector((state) => state.image.uploadedImage);
  const templateImage = useSelector((state) => state.image.templateImage);

  // Determine which image to display
  const displayImage =
    templateImage || imageUrl || uploadedImage || Icons.emptyPreviewTemplate;

  return (
    <div>
      <h3 className="text-[16px] text-[#484848] font-normal">Preview panel</h3>
      <div className="bg-[#FAFAFA] rounded-[30px] p-[25px] mt-3">
        <div className=" w-full h-auto  md:min-h-[412px]  max-h-[512px] ">
          <div className="flex flex-col w-full h-full">
            <div className="whatsapp-header bg-[#075E54] text-white p-6 rounded-t-[20px]"></div>
            <div className="whatsapp-body rounded-b-[20px] bg-[#ECE5DD] p-[15px] h-auto flex flex-col gap-3 overflow-y-scroll hide-scrollBar md:min-h-[412px] pb-10 max-h-[512px]">
              <div className="w-[85%] bg-white rounded-[10px] h-full ">
                <div className="w-full h-[120px]">
                  <img
                    src={displayImage}
                    alt="template"
                    className="w-full h-[120px] object-cover rounded-[10px] object-center"
                  />
                </div>

                <div className="flex flex-col gap-4 mt-3 pl-3">
                  <p className="font-normal text-[20px] text-[#767676] capitalize">
                    {message.header}
                  </p>
                  <p className="font-normal text-[15px] text-[#767676] whitespace-pre-wrap">
                    {message.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePreview;
