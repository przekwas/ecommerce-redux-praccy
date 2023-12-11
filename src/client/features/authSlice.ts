import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { fetchData } from '../services/fetchData';

const createSliceWithThunks = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator }
});

const authSlice = createSliceWithThunks({
	name: 'auth',
	initialState: {
		loggedIn: false,
		token: null,
		loading: false,
		error: ''
	},
	reducers: create => ({
		login: create.asyncThunk(
			async (userCredentials, thunkApi) => {
				try {
					await fetchData('/api/auth/login', 'POST', userCredentials);
					// Assuming successful login sets the cookie
					return true; // Indicating successful login
				} catch (error) {
					return thunkApi.rejectWithValue(error);
				}
			},
			{
				pending: state => {
					state.loading = true;
				},
				rejected: (state, action) => {
					state.error = action.error?.message as string;
					state.loading = false;
				},
				fulfilled: state => {
					state.loggedIn = true;
					state.loading = false;
				}
			}
		)
	})
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
