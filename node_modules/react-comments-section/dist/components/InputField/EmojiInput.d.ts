/// <reference types="react" />
import './InputField.scss';
interface EmojiInputProps {
    text: string;
    setText: Function;
    mode?: string;
    inputStyle?: object;
}
declare const EmojiInput: ({ text, setText, mode, inputStyle }: EmojiInputProps) => JSX.Element;
export default EmojiInput;
