import { CardType, ColumnType } from '@/types/types';
import { CardItem } from './CardItem';
import { useDroppable } from '@dnd-kit/core';

type ColumnProps = {
    column: ColumnType;
    cards: CardType[];
};

export const Column = ({ column, cards }: ColumnProps) => {
    const { setNodeRef } = useDroppable({
        id: column,
        data: { column },
    });

    return (
        <div ref={setNodeRef} className="bg-gray-300 rounded p-4 min-h-[300px]">
            <h2 className="text-lg font-semibold mb-4">{column}</h2>
            <div className="space-y-2">
                {cards.length === 0 ? (
                    <div className="h-10 rounded bg-white shadow text-sm text-gray-400 flex items-center justify-center">
                        Drop here
                    </div>
                ) : (
                    cards.map((card) => <CardItem key={card.id} card={card} />)
                )}
            </div>
        </div>
    );
}
