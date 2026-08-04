
import { Name } from "./Basic-Information/Name"
import { Sku } from "./Basic-Information/Sku"
import { Slug } from "./Basic-Information/Slug"
import { ShortDescription } from "./Basic-Information/ShortDescription"

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
