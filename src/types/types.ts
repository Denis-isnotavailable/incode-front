export enum Column {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    Done = 'Done',
}

export enum Operations {
    CREATE = 'Create',
    UPDATE = 'Update',
    DELETE = 'Delete',
}

export type ColumnType = keyof typeof Column;

export type BoardType = {
    id: number;
    name: string;
    cards: CardType[];
}

export type CardType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    column: ColumnType;
    boardId: number;
};
