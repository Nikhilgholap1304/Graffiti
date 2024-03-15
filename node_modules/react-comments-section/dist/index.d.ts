/// <reference types="react" />
import './Index.scss';
interface CommentSectionProps {
    currentUser: {
        currentUserId: string;
        currentUserImg: string;
        currentUserProfile: string;
        currentUserFullName: string;
    } | null;
    logIn: {
        loginLink: string;
        signupLink: string;
    };
    replyTop?: boolean;
    customImg?: string;
    inputStyle?: object;
    formStyle?: object;
    submitBtnStyle?: object;
    cancelBtnStyle?: object;
    overlayStyle?: object;
    imgStyle?: object;
    replyInputStyle?: object;
    commentsCount?: number;
    hrStyle?: object;
    titleStyle?: object;
    onSubmitAction?: Function;
    onDeleteAction?: Function;
    onReplyAction?: Function;
    onEditAction?: Function;
    customNoComment?: Function;
    currentData?: Function;
    removeEmoji?: boolean;
    advancedInput?: boolean;
    commentData: Array<{
        userId: string;
        comId: string;
        fullName: string;
        avatarUrl: string;
        text: string;
        userProfile?: string;
        replies?: Array<{
            userId: string;
            comId: string;
            fullName: string;
            avatarUrl: string;
            text: string;
            userProfile?: string;
        }> | undefined;
    }>;
}
export declare const CommentSection: ({ currentUser, customImg, inputStyle, formStyle, submitBtnStyle, cancelBtnStyle, overlayStyle, replyInputStyle, logIn, imgStyle, replyTop, commentsCount, commentData, hrStyle, titleStyle, removeEmoji, onSubmitAction, onDeleteAction, onReplyAction, onEditAction, customNoComment, currentData, advancedInput }: CommentSectionProps) => JSX.Element;
export {};
