import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: {},
        isAuthenticated: false,
        error: null,
        message: null,
        isUpdated: false,
    },
    reducers: {
        loginRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            state.message = action.payload;
        },
        loginFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
        },
        logoutSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.message = action.payload;
        },
        logoutFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
            state.error = action.payload;
        },
        loadUserRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loadUserFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
        },
        updatePasswordRequest(state, action) {
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updatePasswordSuccess(state, action) {
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updatePasswordFailed(state, action) {
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },
        updateProfileRequest(state, action) {
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updateProfileFailed(state, action) {
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },
        updateProfileResetAfterUpdate(state, action) {
            state.error = null;
            state.isUpdated = false;
            state.message = null;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state = state.user;
        },
    },
});

export const login = (email, password) => async (dispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
        const response = await axios.post(
            `${backendUrl}/api/v1/auth/login`,
            { email, password },
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(userSlice.actions.loginSuccess(response.data.message));
        dispatch(getUser())
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
};

export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.loadUserRequest());
    try {
        const { data } = await axios.get(`${backendUrl}/api/v1/auth/profile`, {
            withCredentials: true,
        });
        dispatch(userSlice.actions.loadUserSuccess(data.user));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
    }
};

export const logout = () => async (dispatch) => {
    try {
        const response = await axios.get(
            `${backendUrl}/api/v1/auth/logout`,
            { withCredentials: true }
        );
        dispatch(userSlice.actions.logoutSuccess(response.data.message));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    }
};

export const updatePassword =
    (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
        dispatch(userSlice.actions.updatePasswordRequest());
        try {
            const { data } = await axios.put(
                `${backendUrl}/api/v1/auth/update/password`,
                { currentPassword, newPassword, confirmNewPassword },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
            dispatch(userSlice.actions.updatePasswordSuccess(data.message));
            dispatch(userSlice.actions.clearAllErrors());
        } catch (error) {
            dispatch(
                userSlice.actions.updatePasswordFailed(error.response.data.message)
            );
        }
    };

export const updateProfile = (data) => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try {
        const response = await axios.put(
            `${backendUrl}/api/v1/auth/update/profile`,
            data,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(userSlice.actions.updateProfileSuccess(response.data.message));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            userSlice.actions.updateProfileFailed(error.response.data.message)
        );
    }
};
export const resetProfile = () => (dispatch) => {
    dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};
export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;