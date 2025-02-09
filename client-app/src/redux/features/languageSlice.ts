import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: "en",
};

export const reducerKey = "appLanguage";

const slice = createSlice({
  name: reducerKey,
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      return { ...state, language: action.payload };
    },
  },
});

export const selectAppLanguage = (state: {
  appLanguage: { language: string };
}) => state.appLanguage.language;

export const { setLanguage } = slice.actions;
export default slice.reducer;
