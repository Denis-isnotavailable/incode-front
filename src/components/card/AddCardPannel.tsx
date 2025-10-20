import React, { useState } from 'react';
import { Button } from '../Button';
import { Operations } from '@/types/types';
import { Modal } from '../Modal';
import { CardForm } from './CardForm';

type AddCardPannelProps = {
    boardId: number;
}

export const AddCardPannel = ({ boardId }: AddCardPannelProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsModalOpen(true)}>Add new card</Button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Card Operation: ${Operations.CREATE}`}
            >
                <CardForm boardId={boardId} onSuccess={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}
