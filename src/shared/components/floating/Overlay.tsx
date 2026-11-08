


interface Props {
    open: boolean;
    description?: string;
    clickable?:boolean
}

/**
 * El contenedor padre de contener la clase "relative"
 * @param param0 
 * @returns 
 */

export const Overlay = ({ open, description, clickable=true }: Props) => {
    return open ?
        <>
            {description &&
                <span className=" sticky right-2 block w-max ml-auto top-2 z-20 rounded border border-border-subtle bg-gray-200 dark:bg-gray-600 px-2 py-1 text-xs font-medium text-text">
                    {description}
                </span >
            }

            <div className={`absolute inset-0 z-10 bg-surface-black/50 ${clickable ? "pointer-events-none":""} `} />

        </>
        : null
}
