# Board Manager — Next.js + DnD

Task board built with Next.js, NestJS, Prisma, and @dnd-kit. Supports drag-and-drop cards across columns

## Features

- Drag-and-drop cards between columns (`ToDo`, `InProgress`, `Done`)
- Edit, delete, and update cards with modal forms
- Smooth reordering within columns
- Backend powered by NestJS + Prisma
- UI with TailwindCSS

## Tech Stack

| Layer       | Tech                             |
| ----------- | -------------------------------- |
| Frontend    | Next.js, React, TypeScript       |
| Drag & Drop | @dnd-kit/core, @dnd-kit/sortable |
| Styling     | TailwindCSS                      |
| State Mgmt  | Redux Toolkit + RTK Query        |
| Backend     | NestJS, Prisma, PostgreSQL       |
| Deployment  | Vercel                           |

## Installation

````bash
git clone
cd incode-front
npm install


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

## Folder Structure

src/
├── components/
│ ├── board/
│ ├── card/
│ ├── Modal.tsx
│ └── Button.tsx
├── store/
│ ├── currentBoardSlice.ts
│ └── store
├── types/
│ └── types.ts
├── pages/
│ └── page.tsx
