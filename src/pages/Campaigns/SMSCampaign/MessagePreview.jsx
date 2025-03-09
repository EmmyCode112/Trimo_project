import { Icons } from "@/assets/assets";

const MessagePreview = ({ message, customer }) => {
  // Replace {{customer_name}} with actual customer name
  const replaceVariables = (msg, customer) => {
    return msg.replace(
      /{{customer_name}}/g,
      `${customer.firstName} ${customer.lastName}`
    );
  };

  return (
    <div className="">
      <h3 className="text-[16px] text-[#484848] font-normal">Preview panel</h3>
      <div className="bg-[#FAFAFA] rounded-[30px] p-[45px] mt-3">
        <div>
          <img src={Icons.IphoneTopNavigation} alt="" className="w-full"/>
        </div>
        <div className="bg-white w-full py-[45px] px-[15px]">
          <div
            className="bg-[#E9E9EB] rounded-[14px] px-[9px] py-[5px] whitespace-normal w-full text-[14px] font-normal"
            dangerouslySetInnerHTML={{
              __html: replaceVariables(message, customer),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MessagePreview;
