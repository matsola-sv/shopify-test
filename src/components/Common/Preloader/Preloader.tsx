import { FC } from "react";

interface PreloaderProps {
    message?: string;
    className?: string;
}

const Preloader: FC<PreloaderProps> = ({ message = "Loading...", className = "" }) => {
    return (
        <div className={`preloader ${className}`}>
            <p>{message}</p>
        </div>
    );
}

export default Preloader;
