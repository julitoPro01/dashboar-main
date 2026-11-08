"use client"
import { useEffect, useRef, InputHTMLAttributes } from 'react'

// 1. Definir los tamaños disponibles
type CheckboxSize = 'sm' | 'md' | 'lg'

export function Checkbox({
    indeterminate,
    size = 'md', // 2. Valor por defecto
    className = '',
    fieldClass="",
    isRequired,
    ...rest
}: {
    indeterminate?: boolean
    isRequired?: boolean
    fieldClass?:string
    size?: CheckboxSize // 3. Agregar a las propiedades
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>) { // 4. Omitir el 'size' nativo para usar el nuestro

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
                className={`${sizeClasses[size]} ${fieldClass} `}
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
