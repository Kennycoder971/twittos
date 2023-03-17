import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UserType = {
  name: string;
  password?: string;
  email: string;
};

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => {
    return {
      registerUser: builder.mutation({
        query: ({ email, password, name }: UserType) => {
          return {
            url: "/register",
            method: "POST",
            body: {
              email,
              password,
              name,
            },
          };
        },
      }),
      getCurrentUser: builder.query({
        query: () => {
          return {
            url: "/currentUser",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useRegisterUserMutation, useGetCurrentUserQuery } = userApi;
export { userApi };
