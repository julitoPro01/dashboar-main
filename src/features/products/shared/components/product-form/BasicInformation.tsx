
import { Name } from "./basic-Information/Name"
import { Sku } from "./basic-Information/Sku"
import { Slug } from "./basic-Information/Slug"
import { ShortDescription } from "./basic-Information/ShortDescription"

export const BasicInformation = () => {
    return (
        <>
            <Name />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" >
                <Sku />
                <Slug />
            </div>
            <ShortDescription />
        </>
    )
}
