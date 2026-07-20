
export interface FieldProps {
    attribute: {
        id: number;
        name: string;
        isRequired?: boolean;
        placeholder?: string;
        options?: {
            id: number;
            value: string;
        }[];
    };

    value?: unknown;

    onChange: (value: unknown) => void;
    className?:string;
}