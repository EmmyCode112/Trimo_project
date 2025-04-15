import React from 'react';
import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useKYCStore } from '@/lib/store2';

export const DocumentSelection = ({ documentTypes, onNext }) => {
  const { documentType, setDocumentType } = useKYCStore();

  return (
    <div className="flex flex-col gap-6">
      {/* Country Selection */}
      <div className="flex flex-col items-start gap-1.5 relative self-stretch w-full">
        <label className="w-fit mt-[-1.00px] font-body-sm-medium text-foundationtexttext-blacktext-black-500">
          Select document issues country.
        </label>
        <Select defaultValue="nigeria">
          <SelectTrigger className="flex items-center relative self-stretch w-full bg-basewhite rounded-lg overflow-hidden border border-solid border-[#cfd4dc]">
            <div className="flex items-center gap-2 pl-3.5 pr-0 py-2.5 relative flex-1 grow">
              <div className="flex items-center gap-2 relative flex-1 grow">
                <div className="relative w-[21.33px] h-4 bg-[url(/group.png)] bg-[100%_100%]" />
                <SelectValue placeholder="Select a country">Nigeria</SelectValue>
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nigeria">Nigeria</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500 mt-1">This is a hint text to help user.</p>
      </div>

      {/* Document Type Selection */}
      <div className="flex flex-col gap-2">
        <label className="font-body-sm-medium text-foundationtexttext-blacktext-black-500">
          Select document type
        </label>
        <div className="inline-flex items-center gap-3">
          {documentTypes.map((doc) => (
            <Card
              key={doc.id}
              className={`relative w-[245px] h-[103px] ${doc.bgColor} rounded-[10px] overflow-hidden border border-solid ${
                documentType === doc.title
                  ? 'border-green-500 shadow-lg'
                  : doc.borderColor
              } cursor-pointer hover:shadow-md transition-all`}
              onClick={() => setDocumentType(doc.title)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  <h3 className={`font-medium ${doc.textColor}`}>
                    {doc.title}
                  </h3>
                  <p className={`text-sm ${doc.descriptionColor}`}>
                    {doc.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-1">This is a hint text to help user.</p>
      </div>
    </div>
  );
};