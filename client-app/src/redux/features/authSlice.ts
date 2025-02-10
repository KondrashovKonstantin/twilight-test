/* eslint-disable no-param-reassign */
import {
  AnyAction,
  CaseReducer,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";
import { RootState } from "../store";
import { logout } from "../api/twilight.api";

export const reducerKey = "auth";

type AccessAuthState = {
  access_token: string;
};

type NullableAuthState = {
  access_token: null;
};

type AuthState = AccessAuthState | NullableAuthState;

const initialState: AuthState = {
  access_token: null,
};

const setToken: CaseReducer<
  AuthState,
  PayloadAction<{ access_token: string | null }>
> = (state, { payload }) => {
  state.access_token = payload.access_token;
};

const clearStore: CaseReducer<AuthState, AnyAction> = () => initialState;

const slice = createSlice({
  name: reducerKey,
  initialState: initialState as AuthState,
  reducers: {
    setAccessToken: setToken,
  },
  extraReducers: (builder) => {
    builder.addCase(logout, clearStore);
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, setToken);
  },
});

export const selectCurrentAccessToken = (state: RootState) =>
  state.auth.access_token;

export const { setAccessToken } = slice.actions;

export default slice.reducer;
