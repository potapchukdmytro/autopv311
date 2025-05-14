import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../types";
import { Role } from "../store/features/role/types";

export const roleApi = createApi({
    reducerPath: 'roleApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_URL}),
    endpoints: (builder) => ({
        load: builder.mutation<ApiResponse<Role[]>, null>({
            query: () => ({
                url: 'role',
                method: 'GET'
            })
        })
    })
})

export const { useLoadMutation } = roleApi;