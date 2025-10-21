import { CardType, Operations } from '@/types/types';
import React, { useState } from 'react';
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { CardForm } from './CardForm';
import { DeleteCardConfirm } from './DeleteCardConfirm';

type EditCardPannelProps = {
    card: CardType;
}

export const EditCardPannel = ({ card }: EditCardPannelProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardOperationName, setCardOperationName] = useState('');

    const handleUpdateCard = () => {
        setIsModalOpen(true);
        setCardOperationName(Operations.UPDATE);
    }

    const handleDeleteCard = () => {        
        setIsModalOpen(true);
        setCardOperationName(Operations.DELETE);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCardOperationName('');
    }

    return (
        <div className="flex gap-5 items-center justify-end mx-auto p-1 bg-white">
            <Button onClick={handleUpdateCard}><IoCreateOutline /></Button>
            <Button onClick={handleDeleteCard}><IoTrashOutline /></Button>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={`Card Operation: ${cardOperationName}`}
            >
                {cardOperationName === Operations.UPDATE &&
                    <CardForm card={card} onSuccess={handleCloseModal} />}
                
                {cardOperationName === Operations.DELETE &&
                    <DeleteCardConfirm cardId={card.id} boardId={card.boardId} onSuccess={handleCloseModal} />}
            </Modal>
        </div>
    )
};
