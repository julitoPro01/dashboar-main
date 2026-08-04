import { IMAGE_STYLE } from "@/src/shared/theme/image";
import Image from "next/image";

export const BodyCells = {
    Index: (index: string) => <span>{index}</span>,

    Image: (val: string, name: string, i: number) =>
        <div className={`${IMAGE_STYLE.list} rounded-lg`}>
            <Image src={val ? val : "/assets/notfound.jpg"}
                alt={name.split(' ')[0]} fill className={`${IMAGE_STYLE.image}`}
                priority={i < 15} sizes={IMAGE_STYLE.size_list}
            />
        </div>,

    Name: (val: string) => <p className=" font-semibold  line-clamp-3 wrap-break-word">{val}</p>,

    Sku: (val: string) => <span className="font-semibold" >{val}</span>,

    Category: (val: string) => <p className="font-semibold line-clamp-3 wrap-break-word" > {val} </p>,

    VariantsCount: (val: number) => <span className="font-semibold" >{val}</span>,

    Price: () => <div> {"Precio"} </div>,

    Stock: () => <div> {"Stock"} </div>,

    State: () => <div>{"State"}</div>,

    Date: () => <div> {"Fecha"} </div>
}