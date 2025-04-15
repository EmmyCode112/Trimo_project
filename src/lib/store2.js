import { create } from 'zustand';

const initialState = {
  step: 1,
  documentType: null,
  frontFile: null,
  backFile: null,
  frontProgress: 0,
  backProgress: 0,
  frontUploaded: false,
  backUploaded: false,
  selfieUploaded: false,
};

export const useKYCStore = create((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setDocumentType: (type) => set({ documentType: type }),
  setFrontFile: (file) => set({ frontFile: file }),
  setBackFile: (file) => set({ backFile: file }), 
  setFrontProgress: (progress) => set({ frontProgress: progress }),
  setBackProgress: (progress) => set({ backProgress: progress }),
  setFrontUploaded: (uploaded) => set({ frontUploaded: uploaded }),
  setBackUploaded: (uploaded) => set({ backUploaded: uploaded }),
  setSelfieUploaded: (uploaded) => set({ selfieUploaded: uploaded }),
  reset: () => set(initialState),
}));