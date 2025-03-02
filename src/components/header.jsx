import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Save, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Clock } from "iconsax-react";

export default function Header({ lastSaved, onSave, onSendTest, isPreviewMode, togglePreviewMode }) {
  return (
    <header className="flex items-center justify-between py-4 px-12 h-[69px] bg-white border-b border-[#F1F1F1]">
      <div className="flex items-center space-x-4">
        <Link to="/" passHref>
          <Button variant="outline" className="w-[101px] rounded-[8px] h-[44px] text-[#383268] font-medium text-[16px] bg-whote border border-[#C1BFD0]" size="sm">
            <ArrowLeft className="w-[20px] h-[20px] mr-2 text-[#383268]" />
            Back
          </Button>
        </Link>
      </div>
      <div className="flex items-center space-x-3">
      {lastSaved && (
          <span className="flex items-center text-[#767676]">
            <Clock variant="Linear" className="w-4 h-4 mr-2" />
            <span className="text-[14px] font-normal">
                Last saved: {formatDistanceToNow(lastSaved, { addSuffix: true })}
            </span>
          </span>
        )}
        <Button variant="outline" className="w-[111px] h-[44px] rounded-[8px] border text-[#383268] text-[16px] font-medium border-[#C1BFD0] bg-white" onClick={togglePreviewMode}>
          {isPreviewMode ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Exit Preview
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </>
          )}
        </Button>
        <Button variant="outline" className="w-[111px] h-[44px] rounded-[8px] border text-[#383268] text-[16px] font-medium border-[#C1BFD0] bg-white" onClick={onSendTest}>
          {/* <Send className="w-4 h-4 mr-2" /> */}
          Send Test
        </Button>
        <Button variant="outline" className="bg-[#383268] w-[72px] h-[44px] rounded-[8px] text-white font-medium text-[16px]" onClick={onSave}>
          Save
        </Button>
      </div>
    </header>
  );
}