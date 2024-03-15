/// <reference types="react" />
import './LoginSection.scss';
interface LoginSectionProps {
    loginLink: string;
    signUpLink: string;
}
declare const LoginSection: ({ loginLink, signUpLink }: LoginSectionProps) => JSX.Element;
export default LoginSection;
