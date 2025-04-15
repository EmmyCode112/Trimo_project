import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useKYCStore } from '@/lib/store2';

export const UploadSection = ({ onNext }) => {
  const {
    frontProgress,
    backProgress,
    frontUploaded,
    backUploaded,
    setFrontFile,
    setBackFile,
    setFrontProgress,
    setBackProgress,
    setFrontUploaded,
    setBackUploaded,
  } = useKYCStore();

  const simulateUpload = async (file, setProgress, setUploaded) => {
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    setUploaded(true);
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'front') {
      setFrontFile(file);
      await simulateUpload(file, setFrontProgress, setFrontUploaded);
    } else {
      setBackFile(file);
      await simulateUpload(file, setBackProgress, setBackUploaded);
    }
  };

  const renderUploadBox = (type, progress, isUploaded) => {
    if (progress > 0 && progress < 100) {
      return (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 relative overflow-hidden">
          {/* Green overlay with progress */}
          <div 
            className="absolute inset-0 bg-green-50 transition-all" 
            style={{ width: `${progress}%` }}
          />
          
          <div className="relative z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-green-500 flex items-center justify-center">
                <span className="text-green-500 font-medium">{`${progress}%`}</span>
              </div>
              <div className="text-sm font-medium">Uploading Document</div>
              <div className="text-xs text-gray-500">{`${progress}% Completed`}</div>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-4 h-4">
                  <img src="/pdf-icon.svg" alt="PDF" className="w-full h-full" />
                </div>
                <span className="text-xs text-gray-500">PDF</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return !isUploaded ? (
      <label className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center block cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={(e) => handleFileUpload(e, type)}
          accept="image/*,.pdf"
        />
        <div className="flex flex-col items-center gap-2">
          <img
            src="/vuesax-linear-add-square.svg"
            alt="Upload"
            className="w-10 h-10 text-gray-400"
          />
          <div className="text-sm font-medium">
            Click to upload {type} view
          </div>
          <div className="text-sm text-gray-500">
            or drag and drop
          </div>
          <div className="text-xs text-gray-400">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </div>
        </div>
      </label>
    ) : (
      <div className="border-2 border-green-100 bg-green-50 rounded-lg p-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="text-sm font-medium">
            {type.charAt(0).toUpperCase() + type.slice(1)} View Upload Successful
          </div>
          <div className="text-xs text-gray-500">
            File_Title.PDF | 313 KB | 31 Aug, 2022
          </div>
          <button
            className="text-orange-500 text-sm font-medium"
            onClick={() => {
              if (type === 'front') {
                setFrontFile(null);
                setFrontProgress(0);
                setFrontUploaded(false);
              } else {
                setBackFile(null);
                setBackProgress(0);
                setBackUploaded(false);
              }
            }}
          >
            Clear Upload
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col w-[572px] items-start gap-[7px]">
        <h2 className="relative self-stretch mt-[-1.00px] font-body-lg-medium text-foundationbrandprimary-blackprimary-black-400">
          Intermediate Verification
        </h2>
        <p className="w-fit text-foundationtextgreygrey-500 text-[length:var(--body-sm-regular-font-size)] leading-[var(--body-sm-regular-line-height)] whitespace-nowrap relative font-body-sm-regular">
          Fill in the parts inside completing the interviewer's personal
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          {renderUploadBox('front', frontProgress, frontUploaded)}
        </div>
        <div className="flex-1">
          {renderUploadBox('back', backProgress, backUploaded)}
        </div>
      </div>
    </div>
  );
};