
interface Props {
    createdAt: Date;
    updatedAt: Date;
}

export const Footer = ({ createdAt, updatedAt }: Props) => {
    return (
        <section className="text-sm text-gray-500 border-t pt-4">
            <p>Creado: {createdAt.toLocaleString()}</p>
            {updatedAt && (
                <p>Actualizado: {updatedAt.toLocaleString()}</p>
            )}
        </section>)
}
