import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useKYCStore } from '@/lib/store2';
import { UploadCloud } from 'lucide-react';


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
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-green-50">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center w-full">
              <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-medium uppercase">PDF</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">Uploading Document</div>
              <div className="w-full mt-2 mb-1">
                <Progress value={progress} className="h-2 bg-green-100" indicatorClassName="bg-green-500" />
              </div>
              <div className="text-xs text-gray-500">{`${progress}% Completed`}</div>
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
          <UploadCloud 
            size={40}
            className="text-gray-400"
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
    <div className="flex flex-col gap-6 mt-9">
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