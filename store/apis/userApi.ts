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
          console.log("triggered", name, email, password);
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
      getUser: builder.mutation({
        query: ({ email, password }: UserType) => {
          console.log("triggered", email, password);
          return {
            url: "/login",
            method: "GET",
            body: {
              email,
              password,
            },
          };
        },
      }),
    };
  },
});

export const { useRegisterUserMutation } = userApi;
export { userApi };
