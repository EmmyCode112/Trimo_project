import { Icons } from "../../assets/assets";

const GroupFolder = ({ groupName, moveContactsToGroup, folder }) => {
  return (
    <div
      className="flex flex-col folder-con cursor-pointer"
      onClick={() => moveContactsToGroup(folder.id)}
    >
      <div className=" folder-img-con w-full h-auto">
        <img
          src={Icons.FolderIcon}
          alt="folder"
          className="w-full h-full relative"
        />
      </div>

      <div className="w-full">
        <p className="text-[#484848] text-[14px] font-normal">{groupName}</p>

        <div className="flex items-center gap-x-1 mt-1">
          <img src={Icons.contacts2Users} alt="users" />
          <p className="text-[#767676] text-sm font-normal">
            {folder.contacts.length}
          </p>
        </div>
      </div>
    </div>
  );
};
export default GroupFolder;
