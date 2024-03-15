/// <reference types="react" />
import './CommentSection.css';
interface CommentSectionProps {
    overlayStyle?: object;
    logIn: {
        loginLink: string;
        signupLink: string;
    };
    hrStyle?: object;
    titleStyle?: object;
    customNoComment?: Function;
}
declare const CommentSection: ({ overlayStyle, logIn, hrStyle, titleStyle, customNoComment }: CommentSectionProps) => JSX.Element;
export default CommentSection;
