import { Icons } from "../../assets/assets";
import "./Groups.css";

const GroupFolder = ({
  groupName,
  totalContact,
  toggleSelection,
  selectedFolders,
  groupId,
  openFolderDetails,
  folder,
}) => {
  const isSelected = selectedFolders.includes(groupId);
  return (
    <div
      className="flex flex-col folder-con  cursor-pointer"
      onClick={() => openFolderDetails(folder)}
    >
      <div className="relative folder-img-con w-full h-auto sm:w-[184px] sm:h-[115px]">
        <img
          src={Icons.FolderIcon}
          alt="folder"
          className="w-full h-full relative"
        />
        <img
          src={isSelected ? Icons.checkboxActive : Icons.checkbox}
          onClick={(e) => {
            e.stopPropagation(); // ✅ Prevents triggering folder click
            toggleSelection(groupId);
          }}
          alt="checkbox"
          className="absolute top-[12px] left-[10px] cursor-pointer"
        />
      </div>

      <div className="w-full">
        <p className="text-[#484848] text-[16px] font-normal">{groupName}</p>

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
