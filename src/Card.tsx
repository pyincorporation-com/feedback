import React from "react";

interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="card p-0 h-100">
            <div className="card-header">
                <p>{title}</p>
            </div>
            <div className="card-body">{children}</div>
        </div>
    );
};

export default Card;