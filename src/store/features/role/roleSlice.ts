import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role, RoleState } from "./types";

const initialState: RoleState = {
    isLoaded: false,
    roles: []
}

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        loadRoles: (state, action: PayloadAction<Role[]>) => {
            state.isLoaded = true;
            state.roles = action.payload;
        }
    }
});

export const { loadRoles } = roleSlice.actions; 
export default roleSlice.reducer;