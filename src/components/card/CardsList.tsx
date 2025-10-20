'use client'

import React, { useEffect, useState } from 'react'
import Bounded from '../Bounded'
import { selectCurrentBoardValue } from '@/store/services/currentBoardSlice';
import { useSelector } from 'react-redux';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CardType, ColumnType } from '@/types/types';
import { Column } from './Column';
import { useUpdateCardMutation } from '@/store/services/card.service';
import { CardItem } from './CardItem';
import { AddCardPannel } from './AddCardPannel';


const columnOrder: ColumnType[] = ['ToDo', 'InProgress', 'Done'];


export const CardsList = () => {
    const currentBoard = useSelector(selectCurrentBoardValue);    
    const [columns, setColumns] = useState<Record<ColumnType, CardType[]>>({
        ToDo: [],
        InProgress: [],
        Done: [],
    });
    const [activeCard, setActiveCard] = useState<CardType | null>(null);
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5, // drag only starts after 5px movement
        },
    }));
    const [updateCard] = useUpdateCardMutation();

    useEffect(() => {
        if (currentBoard?.cards) {
            const initialColumns: Record<ColumnType, CardType[]> = {
                ToDo: [],
                InProgress: [],
                Done: [],
            };
            currentBoard.cards.forEach((card) => {
                initialColumns[card.column].push(card);
            });
            setColumns(initialColumns);
        }
    }, [currentBoard])

    const handleDragStart = (event: DragStartEvent) => {
        const activeId = event.active.id as string;
        const card = Object.values(columns).flat().find((c) => c.id === activeId);
        if (card) setActiveCard(card);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const sourceColumn = Object.entries(columns).find(([_, cards]) =>
            cards.some((card) => card.id === activeId)
        )?.[0] as ColumnType;

        const targetColumn = (over.data?.current?.column || over.id) as ColumnType;

        if (!sourceColumn || !targetColumn) return;

        const activeCard = columns[sourceColumn].find((card) => card.id === activeId);
        if (!activeCard) return;

        if (sourceColumn === targetColumn) {
            const oldIndex = columns[sourceColumn].findIndex((card) => card.id === activeId);
            const newIndex = columns[sourceColumn].findIndex((card) => card.id === overId);
            if (oldIndex === -1 || newIndex === -1) return;

            const reordered = arrayMove(columns[sourceColumn], oldIndex, newIndex);
            setColumns((prev) => ({
                ...prev,
                [sourceColumn]: reordered,
            }));
        } else {
            const updatedSource = columns[sourceColumn].filter((card) => card.id !== activeId);
            const updatedTarget = [...columns[targetColumn], { ...activeCard, column: targetColumn }];

            setColumns((prev) => ({
                ...prev,
                [sourceColumn]: updatedSource,
                [targetColumn]: updatedTarget,
            }));
        }

        if (sourceColumn !== targetColumn) {
            try {
                await updateCard({ id: activeId, data: { column: targetColumn } }).unwrap();
            } catch (err) {
                console.error('Failed to update card column:', err);
            }
        }

        setActiveCard(null);
    };
    
    return (
        <Bounded>
            {currentBoard?.id && <AddCardPannel boardId={currentBoard.id} />}
            
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-3 gap-4 p-4">
                    {columnOrder.map((columnKey) => (
                        <SortableContext
                            key={columnKey}
                            items={columns[columnKey].map((card) => card.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <Column column={columnKey} cards={columns[columnKey]} />
                        </SortableContext>
                    ))}
                </div>

                <DragOverlay>
                    {activeCard ? (
                        <CardItem card={activeCard} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </Bounded>
    );
}
