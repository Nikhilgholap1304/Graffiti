/// <reference types="react" />
import '../InputField/InputField.scss';
interface fooProps {
    formStyle?: object;
    mode?: string;
    cancelBtnStyle?: object;
    submitBtnStyle?: object;
    comId?: string;
    imgStyle?: object;
    imgDiv?: object;
    customImg?: string;
}
declare const EditorConvertToHTML: ({ imgDiv, imgStyle }: fooProps) => JSX.Element;
export default EditorConvertToHTML;
