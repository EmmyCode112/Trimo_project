import Button from "../../Components/buttons/transparentButton";
import { Icons } from "../../assets/assets";

const Contact = () => {
  return (
    <div className="px-[31px] py-[32px] flex flex-col gap-[22px]">
      {/* first row and CTA button */}
      <div className="flex justify-between align-center flex-wrap ga-[20px]">
        <header>
          <h1 className="text-[#1A1A1A] text-[24px] font-medium">
            All Contacts
          </h1>
          <p className="text-[#767676] font-normal text-[15px]">
            View all saved contacts with their details and associated groups at
            a glance.
          </p>
        </header>

        <Button
          label="Add New Contact"
          className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c] max-sm:py-1 max-sm:px-[12px]"
        />
      </div>
      {/* search, sort, and filter row */}
      <div className="flex items-center gap-[19px]">
        <search className="flex items-center gap-2 px-[10px] rounded-[8px] border border-[#D0D5DD] w-[351px] h-[47px]">
          <img
            src={Icons.searchIcon}
            alt="search"
            className="w-[20px] h-[20px]"
          />
          <input
            type="text"
            placeholder="Search by name, email"
            className="p-1 outline-none w-full h-full"
          />
        </search>

        <div className="flex items-center gap-[19px]">
          <div className="px-[18px] py-[10px] flex items-center gap-[10px] rounded-[8px] border border-[#C1BFD0] cursor-pointer text-[#3F3E3E] hover:bg-[#e7e7e7]">
            <img src={Icons.filterIcon} alt="filter" />
            <p>Filter</p>
          </div>
          <div className="px-[18px] py-[10px] flex items-center gap-[10px] rounded-[8px] border border-[#C1BFD0] cursor-pointer text-[#3F3E3E] hover:bg-[#e7e7e7]">
            <img src={Icons.sortIcon} alt="filter" />
            <p>Sort</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
