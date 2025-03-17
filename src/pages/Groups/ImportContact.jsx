import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "@/assets/assets";
import Papa from "papaparse";
import Button from "@/Components/buttons/transparentButton";
import UploadProgress from "@/Components/ProgressBar/UploadProgress";

const ImportContact = ({ isOpen, onClose, contacts, setContacts }) => {
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [importedCount, setImportedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parsedContacts, setParsedContacts] = useState([]);
  const [statusText, setStatusText] = useState("");
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleDragStart = (e) => {
    if (!isMobile) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = { startY: clientY };
  };

  const handleDragMove = (e) => {
    if (!dragRef.current || !isMobile || !modalRef.current) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = clientY - dragRef.current.startY;

    if (delta > 100) {
      onClose();
      dragRef.current = null;
    } else {
      modalRef.current.style.transform = `translateY(${Math.max(0, delta)}px)`;
    }
  };

  const handleDragEnd = () => {
    if (!modalRef.current || !isMobile) return;
    modalRef.current.style.transform = "";
    dragRef.current = null;
  };

  const handleFile = (file) => {
    if (!file) return;

    setIsLoading(true);
    setProgress(0);
    setStatusText("Uploading in progress...");
    setUploadedFile(file);
    setUploadError(null); // Reset error on new upload attempt

    try {
      Papa.parse(file, {
        complete: (result) => {
          const rawData = result.data;
          let duplicateFound = false;

          const newContacts = rawData
            .slice(1)
            .map((row, index) => {
              const contact = {
                id:
                  (contacts.length ? contacts[contacts.length - 1].id : 0) +
                  index +
                  1,
                firstName: row[0]?.trim() || "",
                lastName: row[1]?.trim() || "",
                phone: row[2]?.trim() || "",
                email: row[3]?.trim() || "",
                group: "N/A",
              };

              const isDuplicate = contacts.some(
                (c) =>
                  c.email === contact.email ||
                  c.phone === contact.phone ||
                  (c.firstName === contact.firstName &&
                    c.lastName === contact.lastName)
              );

              if (isDuplicate) {
                duplicateFound = true;
                return null;
              }
              return contact;
            })
            .filter(Boolean);

          if (duplicateFound) {
            alert("Duplicated contact");
          }

          setParsedContacts(newContacts);
          setImportedCount(newContacts.length);
          setIsLoading(false);
          setProgress(100);
          setStatusText("Uploading completed");
        },
        error: (error) => {
          console.error("Parsing error:", error);
          setUploadError("Failed to parse file. Please try again.");
          setIsLoading(false);
          setProgress(0);
          setStatusText("Upload failed");
        },
        header: false,
        skipEmptyLines: true,
      });
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("An error occurred during upload.");
      setIsLoading(false);
      setProgress(0);
      setStatusText("Upload failed");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };
  const handleDeleteFile = () => {
    setUploadedFile(null);
    setParsedContacts([]);
  };
  const handleRetry = () => {
    if (uploadedFile) {
      handleFile(uploadedFile);
    }
  };

  const handleImportContacts = () => {
    setContacts((prevContacts) => [...prevContacts, ...parsedContacts]);
    setUploadedFile(null);
    setParsedContacts([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed flex items-center max-md:items-end justify-center inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`bg-white ${
          isMobile
            ? "inset-x-0 w-full bottom-0 rounded-t-[40px] p-3"
            : "w-[605px] rounded-[40px] p-[22px]"
        }`}
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
        onTouchMove={handleDragMove}
        onMouseMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseUp={handleDragEnd}
      >
        {isMobile && (
          <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mt-4" />
        )}

        <div>
          <div className="flex justify-end">
            <img
              src={Icons.crossIcon}
              alt="close icon"
              className="cursor-pointer "
              onClick={onClose}
            />
          </div>
          <div>
            <h2 className="font-medium text-[18px] text-[#1A1A1A] mb-[6px]">
              Upload file
            </h2>
            <p className="text-[14px] font-normal text-[#767676]">
              Easily add contacts by uploading a CSV file.
            </p>
          </div>
          <div>
            <div
              className={`border-2  border-dashed mt-[18px] mb-[21px] ${
                dragActive ? "border-[#383268]" : "border-gray-300"
              } px-6 py-5 text-center rounded-[20px] cursor-pointer`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="flex flex-col items-center">
                  <div className="items-center justify-center flex flex-col">
                    <div className="">
                      <UploadProgress progress={progress} error={uploadError} />
                    </div>
                    <p className="text-gray-600">{statusText}</p>
                    <h3 className="text-[#1A1A1A] text-[14px] font-normal">
                      Drag and drop csv file to upload
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-y-3 items-center text-center">
                  <img
                    src={Icons.emptyImport}
                    alt="empty import"
                    className="w-[60px] h-[60px]"
                  />
                  <div>
                    <h3 className="text-[#1A1A1A] text-[14px] font-normal">
                      Drag and drop csv file to upload
                    </h3>
                    <p className="text-[#767676] text-[13px] w-[90%] m-auto md:w-[70%]">
                      Please ensure your file is formatted with columns in the
                      following order:{" "}
                      <span className="font-semibold">
                        First Name,Last Name, Phone Number, Email Address.
                      </span>
                    </p>
                  </div>
                  <input
                    className="hidden"
                    id="fileInput"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                  />

                  <label htmlFor="fileInput">
                    <span className="rounded-[8px] border border-[#C1BFDO] hover:bg-[#eeeff0] px-[19px] py-[10px] text-[14px] cursor-pionter">
                      Select File
                    </span>
                  </label>
                </div>
              )}
            </div>
            <div>
              {uploadError ? (
                <div className="border-dashed border-gray-300 border-2 rounded-[20px] py-5 px-4">
                  <span className="text-gray-700">{uploadedFile?.name}</span>
                  <div>
                    <img src={Icons.fileUploadFailed} alt="Upload Failed" />
                    <p>{uploadError}</p>
                  </div>
                  <button onClick={handleRetry} className="text-red-500">
                    Retry
                  </button>
                </div>
              ) : uploadedFile ? (
                <div className="flex w-full justify-between items-center border-dashed border-gray-300 border-2 rounded-[20px] py-5 px-4 max-md:gap-2">
                  <div className="flex items-center gap-3">
                    <img src={Icons.fileUploadSuccess} alt="Upload Success" />
                    <div>
                      <p className="text-[#3F3E3E] text-[14px] font-medium">
                        Upload Successful
                      </p>
                      <div>
                        <p className="text-[12px] text-[#5E5E5E] font-normal">
                          File: {uploadedFile.name} {" "} | {" "}
                          {(uploadedFile.size / 1024).toFixed(2)} KB . {" "}
                          {new Date(uploadedFile.lastModified)
                            .toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(/(\d+) (\w+) (\d+)/, "$1, $2, $3")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <img src={Icons.trashIcon } alt="delete" onClick={handleDeleteFile} className="cursor-pointer" />
                </div>
              ) : null}
            </div>
            <div className="self-end justify-self-end align-end flex items-center gap-3 mt-3">
              <Button
                label="Cancel"
                className="rounded-[8px] border border-[#C1BFDO] hover:bg-[#eeeff0]"
                onClick={onClose}
              />

              <Button
                label="Import"
                className="rounded-[8px] border border-[#C1BFDO] bg-[#383268] hover:bg-[#41397c] text-white"
                onClick={handleImportContacts}
                disabled={!uploadedFile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportContact;
