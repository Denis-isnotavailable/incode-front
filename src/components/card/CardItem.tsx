import { CardType } from '@/types/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EditCardPannel } from './EditCardPannel';

type CardItemProps = {
    card: CardType;
};

export const CardItem = ({ card }: CardItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: card.id,
        data: { column: card.column },
    });   
    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition ?? 'transform 200ms ease',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-3 rounded shadow cursor-grab transition-transform duration-200 ease-in-out"
        >
            <h3 className="font-medium">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.description}</p>

            <EditCardPannel card={card} />
        </div>
    );
};