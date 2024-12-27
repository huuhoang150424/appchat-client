import { createSlice } from "@reduxjs/toolkit";
import { signUser } from "../action/auth";


interface initValuesSign {
	token: string;
	loading: boolean;
	success: boolean;
	message: string;
	error: boolean;
	isAuthenticated: boolean;
	user:any
}

const initialState: initValuesSign = {
	token:  "",
	isAuthenticated : false,
	loading: false,
	success: false,
	message: "",
	error: false,
	user: null
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logoutUser: () => {
			return initialState
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signUser.fulfilled, (state, action:any) => {
			state.loading = false;
			state.success = true;
			state.token = action.payload.token;
			state.error = false;
			state.isAuthenticated=true
			state.user=action.payload.user
		});
		builder.addCase(signUser.pending, (state) => {
			state.loading = true;
			state.success = false;
			state.error = false;
		});
		builder.addCase(signUser.rejected, (state) => {
			state.loading = false;
			state.success = false;
			state.error = true;
		});
	},
});


export const { logoutUser } = authSlice.actions;

export const selectToken = (state: { auth: initValuesSign }) =>
	state.auth.token;
export const selectUser = (state: { auth: initValuesSign }) =>
	state.auth.user;
export const selectIsAuthenticated = (state: { auth: initValuesSign }) =>
	state.auth.isAuthenticated;
export const selectIsSuccess = (state: { auth: initValuesSign }) =>
	state.auth.success;
export const selectIsLoading = (state: { auth: initValuesSign }) =>
	state.auth.loading;
export const selectMessage = (state: { auth: initValuesSign }) =>
	state.auth.message;
export const selectIsError = (state: { auth: initValuesSign }) =>
	state.auth.error;

export default authSlice.reducer;
