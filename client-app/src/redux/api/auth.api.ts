import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthenticationUserPayload {
  apiKey: string;
}

const AuthTag = "Auth";

export const authApi = createApi({
  reducerPath: `authApi`,
  tagTypes: [AuthTag],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { access_token: string },
      AuthenticationUserPayload
    >({
      query(data) {
        return {
          url: `auth/sign-in`,
          method: "post",
          body: data,
        };
      },
      invalidatesTags: [AuthTag],
    }),
  }),
});

export const { useLoginMutation } = authApi;
