import {FC, ReactNode} from "react";

interface ButtonProps {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    children: ReactNode;
    className?: string;
}

const Button: FC<ButtonProps> = (props) => {
    const {
        active = true,
        disabled = false,
        className = '',
        onClick, children
    }: ButtonProps = props;

    if (!active) return null;

    return (
        <button onClick={onClick}
                disabled={disabled}
                className={`button ${className}`}
        >
            {children}
        </button>
    );
}
export default Button;