import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";
import Papa from "papaparse";
import Button from "../../Components/buttons/transparentButton";
import UploadProgress from "../../Components/ProgressBar/UploadProgress";
import { useContacts } from "../../redux/ContactProvider/UseContact"; // Assuming this is correct path

const ImportContact = ({ isOpen, onClose, contacts, setContacts }) => {
  // contacts and setContacts are likely from useContacts now
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Local loading for file parsing
  const [importedCount, setImportedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null); // The actual File object
  const [parsedContacts, setParsedContacts] = useState([]); // The JS array from parsing
  const [statusText, setStatusText] = useState("");
  const [uploadError, setUploadError] = useState(null); // Local error for parsing/pre-upload issues

  const {
    importContact, // This is the API call function from your context
    createContactLoading, // Loading state from context for the API call
    createContactErrorMessage, // Error message from context for the API call
    RetryToFetchContact, // Function to refresh contacts after API call
    // Assuming 'contacts' state for client-side duplicate check is also from context
    // You might get 'contacts' directly from useContacts() if it's needed for client-side validation
    // const { contacts, ... } = useContacts();
  } = useContacts();

  // Adjusted useEffect for modal closing logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Only close if not in the middle of an import API call
        if (!createContactLoading && progress !== 100) {
          // Add condition to prevent closing during API call
          onClose();
          // Reset modal states when closing
          setUploadedFile(null);
          setParsedContacts([]);
          setProgress(0);
          setStatusText("");
          setUploadError(null);
          setImportedCount(0);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, createContactLoading, progress]); // Added dependencies

  // Drag handlers remain the same
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

  // This function now only handles parsing the CSV
  const handleFile = (file) => {
    if (!file) return;

    setIsLoading(true); // Set local parsing loading
    setProgress(0);
    setStatusText("Parsing file...");
    setUploadedFile(file); // Store the actual file
    setUploadError(null); // Reset error on new upload attempt
    setParsedContacts([]); // Clear previous parsed contacts
    setImportedCount(0); // Reset imported count
    // Clear API-related errors from context for a fresh start on new file select
    // Not directly available here, but your `importContact` in context should reset it.

    Papa.parse(file, {
      complete: (result) => {
        const rawData = result.data;
        let duplicateFoundInClientSide = false;

        const processedContacts = rawData
          .slice(1) // Skip the header row
          .map((row) => {
            if (row.length < 4 || row.every((cell) => !cell.trim())) {
              // Check for empty rows more robustly
              console.warn(
                "Skipping row due to insufficient columns or empty row:",
                row
              );
              return null;
            }
            const contact = {
              firstName: row[0]?.trim() || "",
              lastName: row[1]?.trim() || "",
              phone: row[2]?.trim() || "",
              email: row[3]?.trim() || "",
              group: "N/A", // Default group
            };

            // Client-side check for duplicates against the *current* contacts from context
            // Ensure `contacts` prop is populated from `useContacts()` in the parent component
            // or get it directly via `const { contacts } = useContacts();` if `contacts` is not a prop.
            const isDuplicate = contacts.some(
              (c) =>
                c.email === contact.email ||
                c.phone === contact.phone ||
                (c.firstName === contact.firstName &&
                  c.lastName === contact.lastName &&
                  contact.firstName !== "" &&
                  contact.lastName !== "")
            );

            if (isDuplicate) {
              duplicateFoundInClientSide = true;
              return null;
            }
            return contact;
          })
          .filter(Boolean); // Remove null entries (skipped or duplicates)

        if (duplicateFoundInClientSide) {
          console.log(
            "Some contacts were skipped due to client-side duplication."
          );
          setStatusText(
            `File parsed. ${processedContacts.length} contacts ready. Some duplicates were skipped.`
          );
        } else {
          setStatusText(
            `File parsed successfully. ${processedContacts.length} contacts ready.`
          );
        }

        setParsedContacts(processedContacts); // Store the parsed and filtered contacts
        setProgress(100); // Parsing is 100% complete
        setIsLoading(false); // Parsing done
      },
      error: (error) => {
        console.error("Parsing error:", error);
        setUploadError("Failed to parse file. Please ensure it's a valid CSV.");
        setIsLoading(false);
        setProgress(0);
        setStatusText("Parsing failed.");
      },
      header: false,
      skipEmptyLines: true,
    });
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
    setProgress(0);
    setStatusText("");
    setUploadError(null);
    setImportedCount(0);
  };

  const handleRetry = () => {
    // This retry now applies to initial file parsing if it failed
    if (uploadedFile) {
      handleFile(uploadedFile);
    } else {
      // If no file was uploaded, perhaps prompt user to select one again
      setUploadError("Please select a file to retry.");
    }
  };

  // THIS IS THE CRUCIAL FUNCTION TO RESTRUCTURE
  const handleImportContacts = async () => {
    if (!uploadedFile) {
      setUploadError("No file selected for import.");
      return;
    }
    // Optional: If you want to prevent sending files with zero *parsed* contacts
    if (parsedContacts.length === 0) {
      setUploadError("No valid contacts found in the file to import.");
      return;
    }

    setStatusText("Importing contacts to server...");
    setImportedCount(0); // Reset count before new import
    setUploadError(null); // Clear any local UI errors
    // createContactErrorMessage will be cleared by the importContact in UseContact.jsx

    try {
      // Call the API function from the context, passing the actual File object
      await importContact(uploadedFile); // <--- HERE'S THE API CALL!

      // After the API call in `importContact` finishes, it will:
      // 1. Set `createContactLoading` to false in its `finally` block.
      // 2. Set `createContactErrorMessage` if an error occurred.
      // 3. Call `RetryToFetchContact` on success.

      // Now, we check the result of the API call via the context's state:
      if (createContactErrorMessage) {
        setUploadError(createContactErrorMessage); // Display context's error
        setStatusText("Import failed.");
        setProgress(0); // Reset progress on failure
      } else {
        // If no error message from context, assume success
        setImportedCount(parsedContacts.length); // Assuming all parsed were successfully imported
        setStatusText("Import completed successfully!");
        setProgress(100); // API call is done successfully

        // Only close and reset if the import was a full success
        onClose();
        setUploadedFile(null);
        setParsedContacts([]);
        setProgress(0);
        setStatusText("");
        setUploadError(null);
        setImportedCount(0);
      }
    } catch (err) {
      // This catch would only be hit if there's an error *before* the API call
      // or if `importContact` itself doesn't handle its own rejections correctly (which it should)
      console.error("Unexpected error during handleImportContacts:", err);
      setUploadError(
        createContactErrorMessage ||
          "An unexpected error occurred during import."
      );
      setStatusText("Import failed.");
      setProgress(0);
    }
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
        onDragMove={handleDragMove}
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
              onClick={() => {
                if (!createContactLoading && progress !== 100) {
                  // Allow closing only if not importing
                  onClose();
                  // Also reset state here if closing via X button
                  setUploadedFile(null);
                  setParsedContacts([]);
                  setProgress(0);
                  setStatusText("");
                  setUploadError(null);
                  setImportedCount(0);
                }
              }}
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
              {/* Show loading/parsing/uploading progress if a file is uploaded */}
              {uploadedFile ? (
                <div className="flex flex-col items-center">
                  <div className="items-center justify-center flex flex-col">
                    <div className="">
                      <UploadProgress
                        progress={progress}
                        error={uploadError || createContactErrorMessage}
                      />
                    </div>
                    <p className="text-gray-600">
                      {/* Prioritize API loading, then local parsing loading, then status text */}
                      {createContactLoading
                        ? "Importing..."
                        : isLoading
                        ? "Parsing..."
                        : statusText}
                    </p>
                    {uploadedFile &&
                      progress === 100 &&
                      !isLoading && // Local parsing is done
                      !uploadError && // No local parsing error
                      !createContactErrorMessage && // No API error
                      parsedContacts.length > 0 && (
                        <p className="text-green-600 text-sm mt-2">
                          Ready to import {parsedContacts.length} contacts.
                        </p>
                      )}
                    <p className="text-gray-600">{statusText}</p>{" "}
                    {/* Keep this for general updates */}
                    {/* This h3 should probably only show if no file is uploaded yet, or maybe modify its text */}
                    {/* <h3 className="text-[#1A1A1A] text-[14px] font-normal">
                      Drag and drop csv file to upload
                    </h3> */}
                  </div>
                </div>
              ) : (
                // Initial state: no file uploaded
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
              {/* Display errors if any, prioritize API error over local parse error */}
              {uploadError || createContactErrorMessage ? (
                <div className="border-dashed border-gray-300 border-2 rounded-[20px] py-5 px-4">
                  <span className="text-gray-700">{uploadedFile?.name}</span>
                  <div className="flex items-center gap-2 mt-2">
                    <img src={Icons.fileUploadFailed} alt="Upload Failed" />
                    <p className="text-red-600">
                      {uploadError || createContactErrorMessage}
                    </p>
                  </div>
                  {/* Retry button should ideally re-trigger the file selection or import based on error type */}
                  <button onClick={handleRetry} className="text-blue-500 mt-2">
                    {" "}
                    {/* Changed to blue for general retry */}
                    Retry Parsing File
                  </button>
                  {/* If the error is from the API import, you might want a different retry mechanism */}
                  {createContactErrorMessage && (
                    <button
                      onClick={handleImportContacts}
                      className="text-blue-500 mt-2 ml-2"
                    >
                      Retry Import
                    </button>
                  )}
                </div>
              ) : uploadedFile &&
                !createContactLoading &&
                !isLoading &&
                progress === 100 &&
                parsedContacts.length > 0 ? (
                <div className="flex w-full justify-between items-center border-dashed border-gray-300 border-2 rounded-[20px] py-5 px-4 max-md:gap-2">
                  <div className="flex items-center gap-3">
                    <img src={Icons.fileUploadSuccess} alt="Upload Success" />
                    <div>
                      <p className="text-[#3F3E3E] text-[14px] font-medium">
                        File Ready for Import
                      </p>
                      <div>
                        <p className="text-[12px] text-[#5E5E5E] font-normal">
                          File: {uploadedFile.name} |{" "}
                          {(uploadedFile.size / 1024).toFixed(2)} KB .{" "}
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
                  <img
                    src={Icons.trashIcon}
                    alt="delete"
                    onClick={handleDeleteFile}
                    className="cursor-pointer"
                  />
                </div>
              ) : null}
            </div>
            <div className="self-end justify-self-end align-end flex items-center gap-3 mt-3">
              <Button
                label="Cancel"
                className="rounded-[8px] border border-[#C1BFDO] hover:bg-[#eeeff0]"
                onClick={() => {
                  if (!createContactLoading && progress !== 100) {
                    // Prevent canceling mid-import
                    onClose();
                    setUploadedFile(null);
                    setParsedContacts([]);
                    setProgress(0);
                    setStatusText("");
                    setUploadError(null);
                    setImportedCount(0);
                  }
                }}
                disabled={createContactLoading} // Disable cancel during API call
              />

              <Button
                label={createContactLoading ? "Importing..." : "Import"} // Show "Importing..." when API call is active
                className="rounded-[8px] border border-[#C1BFDO] bg-[#383268] hover:bg-[#41397c] text-white"
                onClick={handleImportContacts}
                disabled={
                  !uploadedFile ||
                  isLoading ||
                  createContactLoading ||
                  parsedContacts.length === 0 ||
                  uploadError
                } // Disable if no file, parsing, importing, or local error, or no contacts parsed
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportContact;
