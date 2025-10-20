import React, { useState } from 'react';
import { Button } from '../Button';
import { CardType, Operations } from '@/types/types';
import { useCreateCardMutation, useUpdateCardMutation } from '@/store/services/card.service';
import { useGetBoardByIdQuery } from '@/store/services/board.service';

type CardFormProps = {
    boardId?: number;
    onSuccess: () => void;
    card?: CardType;
}

export const CardForm = ({ boardId, onSuccess, card }: CardFormProps) => {
    const [title, setTitle] = useState(card?.title || '');
    const [description, setDescription] = useState(card?.description || '');
    const [error, setError] = useState('');
    const [updateCard, { isLoading: isUpdating }] = useUpdateCardMutation();
    const [createCard, { isLoading: isCreating }] = useCreateCardMutation();
    const { refetch } = useGetBoardByIdQuery(String(boardId || card?.boardId));

    const isUpdate = Boolean(card?.id);
    const isLoading = isCreating || isUpdating;
    
    const handleSubmit = async () => {
        setError('');
        if (!title.trim() || !description.trim()) {
            setError('Card title and description are required');
            return;
        };

        try {
            if (card?.id) {
                await updateCard({ id: card.id, data: { title, description } }).unwrap();
            } else {
                await createCard({ boardId, title, description }).unwrap();
            }
            refetch()
            onSuccess();
        } catch (e) {
            console.log(e);
            setError('Something went wrong. Please try again');
        }        
    };

    return (
        <div className="space-y-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Card title"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Card description"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleSubmit} disabled={!title || !description || isLoading} isLoading={isLoading}>
                {isUpdate ? Operations.UPDATE : Operations.CREATE}
            </Button>
        </div>
    )
};
