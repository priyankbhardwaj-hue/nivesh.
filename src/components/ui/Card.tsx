import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
    const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : '';

    return (
        <div className={`bg-white border border-neutral-200 rounded-xl p-6 ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
