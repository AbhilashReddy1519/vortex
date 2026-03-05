import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	user: any | null;
}

const initialState: UserState = {
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setUser: (state, action: PayloadAction<any>) => {
			state.user = action.payload;
		},
		clearUser: (state) => {
			state.user = null;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
