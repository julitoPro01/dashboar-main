
interface Props{
    price:number;
    discount:number;
    labelState:string;
    sku:string;
    stock:number;
    minStock:number
}

export const Info = ({price,labelState, discount,sku,stock,minStock}:Props) => {
    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            <DetailRow label="Precio" value={`S/ ${price}`} />
            <DetailRow label="Estado" size="xs" value={`${labelState}`} />
            <DetailRow label="Descuento" size="xs" value={`S/ ${discount}`} />
            <DetailRow label="Sku" value={`${sku}`} />
            <DetailRow label="Stock" value={`${stock}`} />
            <DetailRow label="Stock mínimo" size="xs" value={`S/ ${minStock}`} />
        </div>)
}


const DetailRow = ({ label, value, size }: { label: string; value: string | number, size?: "xs" }) => (
    <p className={`text-gray-700 ${size ? "text-xs" : "text-sm"}`}>
        <span className="font-semibold text-gray-600">{label}:</span> {value}
    </p>
);