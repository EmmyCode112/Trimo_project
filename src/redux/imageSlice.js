import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: "", // For pasted image URL
  uploadedImage: null, // For file uploads
  templateImage: null, // For selected template image
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setUploadedImage: (state, action) => {
      state.uploadedImage = action.payload;
    },
    setTemplateImage: (state, action) => {
      state.templateImage = action.payload;
    },
  },
});

export const { setImageUrl, setUploadedImage, setTemplateImage } = imageSlice.actions;
export default imageSlice.reducer;
