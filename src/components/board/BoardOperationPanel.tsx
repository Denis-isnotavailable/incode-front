'use client'

import React, { useState } from 'react'
import { Button } from '../Button';
import { IoCreateOutline, IoReload, IoTrashOutline } from "react-icons/io5";
import { Modal } from '../Modal';
import { BoardForm } from './BoardForm';
import { Operations } from '@/types/types';
import { DeleteBoardConfirm } from './DeleteBoardConfirm';

type BoardOperationPanelProps = {
    setBoardId: (id: string) => void;
    boardId: string;
    initialName?: string;
};

export const BoardOperationPanel = ({boardId, initialName, setBoardId}: BoardOperationPanelProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [boardOperationName, setBoardOperationName] = useState('');

    const handleCreateBoard = () => {
        setIsModalOpen(true);
        setBoardOperationName(Operations.CREATE);
    }

    const handleUpdateBoard = () => {
        setIsModalOpen(true);
        setBoardOperationName(Operations.UPDATE);
    }

    const handleDeleteBoard = () => {
        setIsModalOpen(true);
        setBoardOperationName(Operations.DELETE);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setBoardOperationName('');
    }

    return (
        <div className="flex gap-5 items-center mx-auto p-6 bg-white">
            <Button onClick={handleCreateBoard}><IoCreateOutline /></Button>
            {initialName && <Button onClick={handleUpdateBoard}><IoReload /></Button>}
            {initialName && <Button onClick={handleDeleteBoard}><IoTrashOutline /></Button>}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={`Board Operation: ${boardOperationName}`}
            >
                {boardOperationName === Operations.CREATE &&
                    <BoardForm onSuccess={handleCloseModal} />}
                
                {boardOperationName === Operations.UPDATE &&
                    <BoardForm id={boardId} initialName={initialName} onSuccess={handleCloseModal} />}
                
                {boardOperationName === Operations.DELETE &&
                    <DeleteBoardConfirm boardId={boardId} setBoardId={setBoardId} onSuccess={handleCloseModal} />}
            </Modal>
        </div>
    )
};
