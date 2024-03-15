/// <reference types="react" />
import './InputField.scss';
interface InputFieldProps {
    formStyle?: object;
    comId?: string;
    fillerText?: string;
    parentId?: string;
    mode?: string;
    customImg?: string;
    inputStyle?: object;
    cancelBtnStyle?: object;
    submitBtnStyle?: object;
    imgStyle?: object;
    imgDiv?: object;
}
declare const InputField: ({ formStyle, comId, fillerText, parentId, mode, customImg, inputStyle, cancelBtnStyle, submitBtnStyle, imgStyle, imgDiv }: InputFieldProps) => JSX.Element;
export default InputField;
