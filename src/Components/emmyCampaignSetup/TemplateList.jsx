import { Icons, templates } from "@/assets/assets";
import React from "react";

const TemplateList = ({ onSelect }) => {
  return (
    <div className="w-full shadow-md flex flex-col border border-[#E4E7EC] pt-3 pb-1 px-2 absolute top-[130%] bg-white z-10 left-0 rounded-[8px] h-[400px] overflow-y-scroll scrollbar ">
      <search className="flex items-center gap-2 px-[10px] rounded-[8px] border border-[#D0D5DD] w-full h-[44px]">
        <img
          src={Icons.searchIcon}
          alt="search by template name or keyword..."
          className="w-[20px] h-[20px]"
        />
        <input
          type="text"
          placeholder="Search"
          className="p-1 outline-none w-full h-full"
        />
      </search>
      <ul className="flex flex-col mt-1">
        {templates.map((template, index) => (
          <li
            className="py-2 px-4 flex items-center gap-3 text-[#3F3E3E] text-[14px] font-normal hover:text-[#1A1A1A] hover:bg-gray-100"
            key={index}
            onClick={() => onSelect(template)}
          >
            <img
              src={template.icon}
              alt="template"
              className="w-[45px] h-[20px] rounded-[5px] object-cover"
            />
            <p>{template.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateList;
