/// <reference types="react" />
import 'react-responsive-modal/styles.css';
interface DeleteModalProps {
    comId: string;
    parentId?: string;
}
declare const DeleteModal: ({ comId, parentId }: DeleteModalProps) => JSX.Element;
export default DeleteModal;
