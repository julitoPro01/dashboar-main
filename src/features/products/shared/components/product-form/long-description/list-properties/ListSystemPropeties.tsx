import { useStore } from "@/src/store/useStore"
import { Item } from "./Item"

export const CountSystemProperties = () => {
    const count = useStore(v => v.productProperties.length)

    return (
        <span className="ml-auto text-xs text-text-muted">
            Definidas por el sistema: <strong>{count}</strong>
        </span>

    )
}

export const ListSystemProperties = () => {

    const systemProps = useStore(v => v.productProperties)

    return (

        <ul className="divide-y divide-border-subtle">

            {
                systemProps.map(v => (
                    <Item key={v.id} property={v} />
                ))
            }
        </ul>

    )
}