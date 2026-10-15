


interface Props {
    open: boolean;
    description?: string
}

/**
 * El contenedor padre de contener la clase "relative"
 * @param param0 
 * @returns 
 */

export const Overlay = ({ open, description }: Props) => {
    return open ?
        <>
            {description &&
                <span className="absolute right-2 top-2 z-20 rounded border border-border-subtle bg-gray-200 dark:bg-gray-600 px-2 py-1 text-xs font-medium text-text">
                    {description}
                </span >
            }

            <div className="absolute inset-0 z-10 bg-surface-black/50 pointer-events-none" />

        </>
        : null
}
