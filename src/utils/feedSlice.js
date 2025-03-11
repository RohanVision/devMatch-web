import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        // eslint-disable-next-line no-unused-vars
        removeFeed: (state, action) => {
            const newFeed = state.filter((user) => user._id !== action.payload);
            return newFeed;
        }
    }
});


export const { addFeed, removeFeed } = feedSlice.actions
export default feedSlice.reducer;