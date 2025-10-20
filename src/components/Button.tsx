import React from 'react';

type ButtonProps = {
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    type?: 'button' | 'submit';
    children: React.ReactNode;
};

export const Button = ({
    onClick,
    disabled = false,
    isLoading = false,
    className = '',
    type = 'button',
    children,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`px-5 py-2 rounded transition text-white ${disabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                } ${className}`}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
}
