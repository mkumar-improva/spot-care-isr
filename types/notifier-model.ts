export type NotifierModel = {
    notifierState?: boolean;
    message: string;
    mode: 'success' | 'error' | 'warning';
    link?: string | null;
    onClick?: () => void;
    className?: string;
    textAlign?:string;
    showDefaultMessage?: boolean; // Optional prop to control default message display
    onClose?:()=>void;
};