import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { SearchResult } from "../../interfaces/searchResult";
import { ChartData } from "../../interfaces/chartData";
import { createAction } from "@reduxjs/toolkit";

const TwilightTag = "Twilight";

export const logout = createAction("logout");

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access_token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const twilightApi = createApi({
  reducerPath: `twilightApi`,
  tagTypes: [TwilightTag],
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    search: builder.mutation<
      {
        total: number;
        count: number;
        results: SearchResult[];
        next?: string;
        domain: string;
      },
      { domain: string; nextToken?: string }
    >({
      query(data) {
        return {
          url: `twilight/search`,
          method: "post",
          body: data,
        };
      },
    }),
    getChartData: builder.mutation<
      {
        [key: string]: ChartData;
      },
      { domain: string; nextToken?: string }
    >({
      query(data) {
        return {
          url: `twilight/get-chart-data`,
          method: "post",
          body: data,
        };
      },
    }),
  }),
});

export const { useSearchMutation, useGetChartDataMutation } = twilightApi;
