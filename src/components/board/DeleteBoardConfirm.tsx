'use client';

import { useDeleteBoardMutation } from "@/store/services/board.service";
import { Button } from "../Button";
import { useState } from "react";

type DeleteBoardConfirmProps = {
    boardId: string;
    onSuccess: () => void;
    setBoardId: (id: string) => void;
}

export const DeleteBoardConfirm = ({ boardId, onSuccess, setBoardId }: DeleteBoardConfirmProps) => {
    const [deleteBoard, { isLoading }] = useDeleteBoardMutation();
    const [error, setError] = useState('');

    const handleDelete = async () => {
        setError('');              
        
        try {
            const res = await deleteBoard(boardId);
            if (res?.error) {
                setError('Something went wrong. Please try again');
            } else {
                setBoardId('')
                onSuccess();
            }
        } catch (e) {
            console.log(e);
            setError('Something went wrong. Please try again');
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-red-600">Are you sure you want to delete this board?</p>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleDelete} disabled={isLoading} isLoading={isLoading}>
                Confirm Delete
            </Button>
        </div>
    );
}