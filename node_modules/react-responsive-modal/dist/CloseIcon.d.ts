import React from 'react';
interface CloseIconProps {
    id?: string;
    closeIcon?: React.ReactNode;
    styles?: {
        closeButton?: React.CSSProperties;
        closeIcon?: React.CSSProperties;
    };
    classNames?: {
        closeButton?: string;
        closeIcon?: string;
    };
    classes: {
        closeButton?: string;
    };
    onClick: () => void;
}
declare const CloseIcon: ({ classes, classNames, styles, id, closeIcon, onClick, }: CloseIconProps) => JSX.Element;
export default CloseIcon;
