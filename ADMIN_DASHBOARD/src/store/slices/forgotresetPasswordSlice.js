import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const forgotrestpassSlice = createSlice({
    name: "forgotpassword",
    initialState: {
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        //login reducer
        forgotPasswordRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        forgotPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetPasswordRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        resetPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        clearAllErrors(state, action) {
            state.error = null;
        },

    }
})

export const forgotPassword = (email) => async (dispatch) => {
    dispatch(forgotrestpassSlice.actions.forgotPasswordRequest())
    try {
        const response = await axios.post(`${backendUrl}/api/v1/auth/password/forgot`, { email }, {
            withCredentials: true, headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(forgotrestpassSlice.actions.forgotPasswordSuccess(response.data.message))
        dispatch(forgotrestpassSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(forgotrestpassSlice.actions.forgotPasswordFailed(error.message))
    }
}
export const resetPassword = (token, password, confirmPassword) => async (dispatch) => { // Fix field name
    dispatch(forgotrestpassSlice.actions.resetPasswordRequest());
    try {
        const response = await axios.put(
            `${backendUrl}/api/v1/auth/password/reset/${token}`,
            { password, confirmPassword }, // Fix: use confirmPassword (without "s")
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        dispatch(forgotrestpassSlice.actions.resetPasswordSuccess(response.data.message));
        dispatch(forgotrestpassSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(forgotrestpassSlice.actions.resetPasswordFailed(error.response?.data?.message || error.message));
    }
};

export const clearAllForgotPasswordErrors = () => (dispatch) => {
    dispatch(forgotrestpassSlice.actions.clearAllErrors())
}

export default forgotrestpassSlice.reducer