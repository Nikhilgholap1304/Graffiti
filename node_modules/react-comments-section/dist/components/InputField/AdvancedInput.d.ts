/// <reference types="react" />
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
interface AdvancedInputProps {
    formStyle?: object;
    handleSubmit: Function;
    mode?: string;
    cancelBtnStyle?: object;
    submitBtnStyle?: object;
    comId?: string;
    imgStyle?: object;
    imgDiv?: object;
    customImg?: string;
    text: string;
}
declare const AdvancedInput: ({ formStyle, handleSubmit, submitBtnStyle, cancelBtnStyle, mode, comId, imgDiv, imgStyle, customImg, text }: AdvancedInputProps) => JSX.Element;
export default AdvancedInput;
