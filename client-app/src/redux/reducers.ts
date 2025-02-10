import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import appLanguageReducer, {
  reducerKey as languageKey,
} from "./features/languageSlice";
import authReducer, { reducerKey as authKey } from "./features/authSlice";
import { authApi } from "./api/auth.api";
import { twilightApi } from "./api/twilight.api";

const languagePersistConfig = {
  key: languageKey,
  storage,
};

const authPersistConfig = {
  key: authKey,
  storage,
};

const rootReducer = combineReducers({
  [languageKey]: persistReducer(languagePersistConfig, appLanguageReducer),
  [authKey]: persistReducer(authPersistConfig, authReducer),
  [authApi.reducerPath]: authApi.reducer,
  [twilightApi.reducerPath]: twilightApi.reducer,
});

export default rootReducer;
