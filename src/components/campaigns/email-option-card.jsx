export function EmailOptionCard({ title, description, link }) {
    return (
      <a href={link} className="">
        <div className="bg-[#FAFAFA] cursor-pointer w-[317px] h-[105px] border border-[#F1F1F1] rounded-[10px] flex items-center justify-center hover:scale-95 transition-transform duration-200">
          <div className="w-[274px] h-[72px] flex flex-col gap-[4px]">
            <h3 className="font-general-sans text-[16px] font-medium text-[#1A1A1A] mb-2">{title}</h3>
            <p className="font-general-sans leading-[20px] text-sm text-[#767676]">{description}</p>
          </div>
        </div>
      </a>
    )
  }
  
  