import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const messageSlice = createSlice({
    name: "messages",
    initialState: {
        loading: false,
        messages: [],
        error: null,
        message: null,
    },
    reducers: {
        getAllMessagesRequest(state) {
            state.error = null;
            state.loading = true;
        },
        getAllMessagesSuccess(state, action) {
            state.messages = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllMessagesFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        deleteMessageRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteMessageSuccess(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;
        },
        deleteMessageFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
        },
        resetMessageSlice(state) {
            state.error = null;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state) {
            state.error = null;
        },
    },
});

export const getAllMessages = () => async (dispatch) => {
    dispatch(messageSlice.actions.getAllMessagesRequest());
    try {
        const response = await axios.get(
            `${backendUrl}/api/v1/message/getAll`,
            { withCredentials: true }
        );
        const allMessages = response.data.allMessages || response.data || []; // Adjust based on your API
        dispatch(messageSlice.actions.getAllMessagesSuccess(allMessages));
        dispatch(messageSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            messageSlice.actions.getAllMessagesFailed(error.response?.data?.message || "Failed to fetch messages")
        );
    }
};

export const deleteMessage = (id) => async (dispatch) => {
    dispatch(messageSlice.actions.deleteMessageRequest());
    try {
        const response = await axios.delete(
            `${backendUrl}/api/v1/message/delete/${id}`,
            { withCredentials: true }
        );
        dispatch(messageSlice.actions.deleteMessageSuccess(response.data.message));
        dispatch(messageSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            messageSlice.actions.deleteMessageFailed(error.response?.data?.message || "Failed to delete message")
        );
    }
};

export const clearAllMessageErrors = () => (dispatch) => {
    dispatch(messageSlice.actions.clearAllErrors());
};

export const resetMessagesSlice = () => (dispatch) => {
    dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;