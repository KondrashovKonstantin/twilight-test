import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import appLanguageReducer, {
  reducerKey as languageKey,
} from "./features/languageSlice";

const languagePersistConfig = {
  key: languageKey,
  storage,
};

const rootReducer = combineReducers({
  [languageKey]: persistReducer(languagePersistConfig, appLanguageReducer),
});

export default rootReducer;
