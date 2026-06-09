import React from 'react';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    onClick,
    className = '',
    type = 'button',
}) => {
    const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';

    const variantStyles = {
        primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md',
        secondary: 'bg-transparent text-neutral-900 border-2 border-neutral-300 hover:border-neutral-400 focus:ring-neutral-400',
        outline: 'bg-transparent border-2 border-current hover:bg-white/10 focus:ring-white',
    };

    const sizeStyles = {
        sm: 'px-6 py-2.5 text-sm',
        md: 'px-8 py-3 text-base',
        lg: 'px-10 py-3.5 text-lg',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
