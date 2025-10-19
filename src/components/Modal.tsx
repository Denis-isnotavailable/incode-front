import React from 'react'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
};


export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>

    );
};
