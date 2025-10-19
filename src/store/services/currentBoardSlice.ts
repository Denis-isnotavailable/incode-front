import { RootState } from '@/store/store';
import { BoardType } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

const currentBoardSlice = createSlice({
    name: 'currentBoard',
    initialState: {} as BoardType,
    reducers: {
        setCurrentBoardValue(state, action) {
            return (state = action.payload);
        },
    },
});

export const { setCurrentBoardValue } = currentBoardSlice.actions;
export const selectCurrentBoardValue = (state: RootState) => state.currentBoard;
export default currentBoardSlice.reducer;