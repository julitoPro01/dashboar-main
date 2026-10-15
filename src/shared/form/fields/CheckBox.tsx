"use client"
import { useEffect, useRef, HTMLProps } from 'react'

// 1. Definir los tamaños disponibles
type CheckboxSize = 'sm' | 'md' | 'lg'

export function Checkbox({
    indeterminate,
    size = 'md', // 2. Valor por defecto
    className = '',
    isRequired,
    label,
    ...rest
}: {
    indeterminate?: boolean
    isRequired?: boolean
    size?: CheckboxSize // 3. Agregar a las propiedades
} & Omit<HTMLProps<HTMLInputElement>, 'size'>) { // 4. Omitir el 'size' nativo para usar el nuestro

    const ref = useRef<HTMLInputElement>(null!)

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [rest.checked, indeterminate])

    return (
        <div className={`flex items-center ${className}`}>
            <input
                type="checkbox"
                ref={ref}
                className={`${sizeClasses[size]} cursor-pointer`}
                {...rest}
            />
        </div>
    )
}
const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
}
