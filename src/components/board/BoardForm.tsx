'use client';

import { useCreateBoardMutation, useUpdateBoardMutation } from '@/store/services/board.service';
import { useState } from 'react';
import { Button } from '../Button';
import { Operations } from '@/types/types';

type BoardFormProps = {
    id?: string;
    initialName?: string;
    onSuccess: () => void;
};

export const BoardForm = ({ id, initialName = '', onSuccess }: BoardFormProps) => {
    const [name, setName] = useState(initialName);
    const [error, setError] = useState('');
    const [createBoard, { isLoading: isCreating }] = useCreateBoardMutation();
    const [updateBoard, { isLoading: isUpdating }] = useUpdateBoardMutation();

    const isUpdate = Boolean(id) && initialName;
    const isLoading = isCreating || isUpdating;

    const handleSubmit = async () => {
        setError('');
        if (!name.trim()) {
            setError('Board name is required');
            return;
        };

        try {
            if (isUpdate) {
                await updateBoard({ id: id!, data: { name } }).unwrap();
            } else {
                await createBoard({ name }).unwrap();
            }
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Board name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleSubmit} disabled={!name || isLoading} isLoading={isLoading}>
                {isUpdate ? Operations.UPDATE : Operations.CREATE}
            </Button>
        </div>
    );
}