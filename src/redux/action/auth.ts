import { createAsyncThunk } from "@reduxjs/toolkit";
import { sign } from "../../data/api";
import { signData } from "../../constants/interface";

export const signUser = createAsyncThunk<
	string,
	signData,
	{ rejectValue: string }
>(
	"auth/sign",
	async (payload: signData, { rejectWithValue }): Promise<string> => {
		try {
			const response = await sign(payload);
			return response.data;
		} catch (err:any) {
			throw rejectWithValue(err.response.data);
		}
	}
);
