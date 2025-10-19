import { configureStore } from '@reduxjs/toolkit';
import { boardApi } from './services/board.service';
import { cardApi } from './services/card.service';
import currentBoardReducer from './services/currentBoardSlice';

export const store = configureStore({
    reducer: {
        [boardApi.reducerPath]: boardApi.reducer,
        [cardApi.reducerPath]: cardApi.reducer,
        currentBoard: currentBoardReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(boardApi.middleware)
            .concat(cardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
