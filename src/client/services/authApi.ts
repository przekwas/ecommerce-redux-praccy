import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + '/api/' }),
	endpoints: builder => ({
		verifyAuth: builder.query({
			query: () => ({
				url: 'auth/verify',
				method: 'POST',
				credentials: 'include'
			})
		})
	})
});

export const { useVerifyAuthQuery } = authApi;
