import { useState, useRef, useEffect } from "react";
import { Icons } from "../../../assets/assets";
import Button from "@/Components/buttons/transparentButton";

const UsersPage = ({ customers, message, setMessage, onOpenPreview }) => {
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkPopup, setShowLinkPopup] = useState(false);

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    link: false,
  });

  const editorRef = useRef(null);
  const selectionRef = useRef(null);

  const applyFormat = (tag) => {
    document.execCommand(tag, false, null);
    setActiveFormats((prev) => ({
      ...prev,
      [tag]: !prev[tag], // Toggle active state
    }));
  };

  const handleInput = (e) => {
    setMessage(e.target.innerHTML);
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      selectionRef.current = selection.getRangeAt(0); // Store selection
    }
  };

  const restoreSelection = () => {
    if (selectionRef.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(selectionRef.current); // Restore selection
    }
  };

  const insertAtCursor = (html) => {
    restoreSelection(); // Restore cursor before inserting
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node, lastNode;
    while ((node = tempDiv.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);
    if (lastNode) {
      range.setStartAfter(lastNode);
      range.setEndAfter(lastNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // Ensure the content updates immediately
    setMessage(editorRef.current.innerHTML);
  };

  const handleInsertLink = () => {
    if (linkText && linkUrl) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" style="color: #4A74FD !important;">${linkText}</a>`;

      insertAtCursor(linkHtml);
      setShowLinkPopup(false);
      setLinkText("");
      setLinkUrl("");
    }
  };

  const linkRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (linkRef.current && !linkRef.current.contains(event.target)) {
        setShowLinkPopup(false);
      }
    };
    if (showLinkPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLinkPopup]);

  const handleInsertVariable = () => {
    insertAtCursor("{{}} ");
  };

  const handleShowLinkPopup = () => {
    saveSelection(); // Save cursor position before opening
    setShowLinkPopup(true);
  };

  const checkActiveFormat = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      link: document.queryCommandState("createLink"),
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-[10px]">
        <p className="mb-[6px]">Compose message</p>

        <p
          className=" lg:hidden cursor-pointer ml-auto"
          onClick={onOpenPreview}
        >
          Preview Here
        </p>
      </div>
      <div className="full rounded-[8px] border border-[#D0D5DD] py-[10px] px-[14px]">
        <div
          placeholder="Type your message here"
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onMouseUp={checkActiveFormat} // Detect active formats
          className="w-full h-[155px] border-none outline-none font-normal text-[14px]"
        ></div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => applyFormat("bold")}
            onMouseUp={checkActiveFormat}
            className={`p-1
              ${
                activeFormats.bold ? " border border-[#383268]" : "bg-[#FAFAFA]"
              }`}
          >
            <img src={Icons.boldIcon} alt="" />
          </button>

          <button
            onClick={() => applyFormat("italic")}
            onMouseUp={checkActiveFormat}
            className={`p-1
              ${
                activeFormats.italic
                  ? " border border-[#383268]"
                  : "bg-[#FAFAFA]"
              }`}
          >
            <img src={Icons.italicIcon} alt="" />
          </button>

          <button
            onClick={() => applyFormat("underline")}
            onMouseUp={checkActiveFormat}
            className={`p-1
              ${
                activeFormats.underline
                  ? " border border-[#383268]"
                  : "bg-[#FAFAFA]"
              }`}
          >
            <img src={Icons.underlinedIcon} alt="" />
          </button>

          <div className="relative" ref={linkRef}>
            <button
              onClick={handleShowLinkPopup}
              className={`${
                showLinkPopup ? " border border-[#383268]" : "bg-[#FAFAFA]"
              } p-1`}
            >
              <img src={Icons.linkIcon} alt="" />
            </button>
            {showLinkPopup && (
              <div className="absolute top-[-500%] left-[-200%] z-10 bg-white shadow-md rounded-[10px] p-[10px] border border-[#F1F1F1]">
                <div className="flex flex-col gap-1">
                  <p className="text-[#484848] text-[14px] font-normal">
                    Embed link
                  </p>
                  <input
                    className="text-[13px] text-[#667085] font-normal rounded-[8px] border border-[#D0D5DD] p-1 outline-none"
                    type="text"
                    placeholder="Enter link text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                  />

                  <div className="flex gap-2 w-full items-center  rounded-[8px] border border-[#D0D5DD] p-1">
                    <img src={Icons.pasteIinkIcon} alt="" />
                    <input
                      className="text-[13px] text-[#667085] font-normal w-full outline-none"
                      type="text"
                      placeholder="Enter URL"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  onClick={handleInsertLink}
                  disabled={!linkText || !linkUrl}
                  className=" px-3 py-2 rounded-[8px] mt-2 text-[13px] bg-[#383268] text-white"
                  label="Attach"
                />
              </div>
            )}
          </div>

          <button onClick={handleInsertVariable} className="p-1 bg-[#FAFAFA]">
            <img src={Icons.veriableIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
