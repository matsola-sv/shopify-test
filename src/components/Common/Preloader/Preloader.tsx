import { FC } from "react";
import './Preloader.css';

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
