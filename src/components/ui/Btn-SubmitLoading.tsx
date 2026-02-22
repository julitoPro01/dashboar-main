import clsx from "clsx";

type ButtonVariant = "primary" | "success" | "danger" | "secondary" | "ghost";

interface Props {
    loading?: boolean;
    disabled?: boolean;
    variant?: ButtonVariant;
    title: string;
    loadingTitle?: string;
    className?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    form?:string;
}

export const BtnSubmitLoading = ({
    loading = false,
    disabled = false,
    title,
    loadingTitle = "Procesando...",
    className,
    icon,
    onClick,
    type = "button",
    form
}: Props) => {
    const isDisabled = disabled || loading;

    return (
        <button
            form={form}
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            aria-busy={loading}
            className={clsx( `
    inline-flex items-center justify-center gap-2
    px-6 py-2.5 rounded-lg text-sm font-semibold
    transition-all duration-150
    shadow-sm

    bg-gray-900 text-white
    hover:bg-gray-800

    dark:bg-gray-100 dark:text-gray-900
    dark:hover:bg-gray-200

    focus:outline-none
    focus:ring-4 focus:ring-primary/30
    dark:focus:ring-primary/40

    disabled:opacity-80
    disabled:cursor-not-allowed
    disabled:hover:bg-gray-900
    dark:disabled:hover:bg-gray-100
    `,
                className
            )}
        >
            {loading && <Spinner />}
            {!loading && icon}
            <span>{loading ? loadingTitle : title}</span>
        </button>
    );
};


const Spinner = () => (
    <svg
        className="h-4 w-4 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
    >
        <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            opacity="0.25"
        />
        <path
            d="M22 12a10 10 0 00-10-10"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
);
