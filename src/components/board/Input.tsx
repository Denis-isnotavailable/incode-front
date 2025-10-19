'use client'

import React, { useEffect, useState } from 'react'
import { useLazyGetBoardByIdQuery } from '@/store/services/board.service';
import { Button } from '../Button';
import { BoardOperationPanel } from './BoardOperationPanel';
import { useDispatch } from 'react-redux';
import { setCurrentBoardValue } from '@/store/services/currentBoardSlice';

export const Input = () => {
    const [boardId, setBoardId] = useState('');    
    const [trigger, { data: board, error, isFetching }] = useLazyGetBoardByIdQuery();
    const dispatch = useDispatch();

    const fetchBoard = () => {
        if (boardId) trigger(boardId);
    };

    useEffect(() => {
        if (error || !board) dispatch(setCurrentBoardValue({}))
        else if (board) dispatch(setCurrentBoardValue(board))        
    }, [board, dispatch, error])
    
    return (
        <>
            <BoardOperationPanel boardId={boardId} setBoardId={setBoardId} initialName={board?.name} />
            
            <div className="flex gap-10 items-center mx-auto p-6 bg-white">
                <input
                    type="text"
                    value={boardId}
                    onChange={(e) => setBoardId(e.target.value)}
                    placeholder="Enter board ID"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <Button
                    onClick={fetchBoard}
                    disabled={isFetching || !boardId}
                    isLoading={isFetching}
                >
                    Load
                </Button>
            </div>

            <div className="h-14 mt-6 p-4 border rounded bg-gray-50">
                {error ?
                    <p className="text-red-500 text-center">Board not found or error occurred.</p> :
                    board && <p className="text-center">You are working on {board.name}</p>
                }
            </div>
        </>
    )
};
