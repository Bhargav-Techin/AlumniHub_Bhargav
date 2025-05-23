import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/',
  prepareHeaders: (headers, { url }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      
    }
    return headers;
  },
});

export const alumniApi = createApi({
  reducerPath: "alumniApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Alumni"],
  endpoints: (builder) => ({
    fetchAlumni: builder.query({
      query: () => {
        return `/alumni`;
      },
    }),
    deleteAlumni: builder.mutation({
      query: (alumniId) => ({
        url: `/alumni/${alumniId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, alumniId) => [{ type: "Alumni", id: alumniId }],
    }),
    fetchAlumniById: builder.query({
      query: (alumniId) => `/alumni/${alumniId}`,
      providesTags: (result, error, alumniId) => [{ type: "Alumni", id: alumniId }],
    }),
  }),
});

export const {
  useFetchAlumniQuery,
  useDeleteAlumniMutation,
  useFetchAlumniByIdQuery,
} = alumniApi;
