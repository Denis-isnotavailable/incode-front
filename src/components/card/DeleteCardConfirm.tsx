'use client';

import { useDeleteCardMutation } from "@/store/services/card.service";
import { Button } from "../Button";
import { useState } from "react";
import { useGetBoardByIdQuery } from "@/store/services/board.service";

type DeleteCardConfirmProps = {
    cardId: string;
    boardId: number;
    onSuccess: () => void;
}

export const DeleteCardConfirm = ({ cardId, boardId, onSuccess }: DeleteCardConfirmProps) => {
    const [deleteCard, { isLoading }] = useDeleteCardMutation();
    const [error, setError] = useState('');
    const { refetch } = useGetBoardByIdQuery(String(boardId));

    const handleDelete = async () => {
        setError('');              
        
        try {
            const res = await deleteCard(cardId);
            if (res?.error) {
                setError('Something went wrong. Please try again');
            } else { 
                refetch();
                onSuccess();
            }
        } catch (e) {
            console.log(e);
            setError('Something went wrong. Please try again');
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-red-600">Are you sure you want to delete this card?</p>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleDelete} disabled={isLoading} isLoading={isLoading}>
                Confirm Delete
            </Button>
        </div>
    );
}