import Image from "next/image"
import { FaImage, FaImages } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { LuImagePlus } from "react-icons/lu";
import { PiStarThin } from "react-icons/pi";
import { IMAGE_STYLE } from "@/src/shared/theme/image/imageStyle";

export const GaleryForm = () => {
    return (
        <section className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-text">
                    <span className="text-primary"> <FaImages /></span>
                    Imágenes de producto
                </h3>
                <span className="text-xs font-medium text-text-muted">3 de 5 imágenes cargadas</span>
            </div>
            <div className="flex flex-wrap gap-4">
                <div className={IMAGE_STYLE.thumb + " group rounded-xl border-2 border-primary shadow-md "}>
                    <Image src={"/assets/notfound.jpg"} alt="image" fill sizes={IMAGE_STYLE.thumb} className={IMAGE_STYLE.image} />
                    <div className="absolute inset-0 bg-hover opacity-0  group-hover:opacity-100 duration-300 transition-opacity flex justify-center items-center gap-2">
                        <button className="text-white bg-red-500 p-2 rounded-full hover:scale-110 transition-transform ">
                            <MdDelete />
                        </button>
                        <button className="text-white bg-orange-500 p-2 rounded-full hover:scale-110 transition-transform ">
                            <FaImage />
                        </button>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">Primary</div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-white/90 text-slate-900 text-[10px] font-bold rounded-lg">#1</div>
                </div>
                <div className={IMAGE_STYLE.thumb + " group rounded-xl border-2 border-primary shadow-md "}>
                    <Image src={"/assets/notfound.jpg"} alt="image" fill sizes={IMAGE_STYLE.thumb} className={IMAGE_STYLE.image} />
                    <div className="absolute inset-0 bg-hover opacity-0  group-hover:opacity-100 duration-300 transition-opacity flex justify-center items-center gap-2">
                        <button className="text-white bg-red-500 p-2 rounded-full hover:scale-110 transition-transform ">
                            <MdDelete />
                        </button>
                        <button className="text-white bg-orange-500 p-2 rounded-full hover:scale-110 transition-transform ">
                            <FaImage />
                        </button>
                    </div>
                    <button className="absolute top-2 left-2 text-white px-2 py-0.5 bg-primary rounded-full hover:scale-110 transition-transform ">
                        <PiStarThin />
                    </button>

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-white/90 text-slate-900 text-[10px] font-bold rounded-lg">#1</div>
                </div>
                <div className={IMAGE_STYLE.thumb + `
                        group rounded-xl border-2 border-dashed border-text-muted hover:border-primary shadow-md bg-surface-light
                         text-text-muted hover:text-primary transition-all
                         `}>
                    <button className={IMAGE_STYLE.img + ` flex flex-col justify-center items-center`}>
                        <span className=" text-3xl"><LuImagePlus /></span>
                        <span className="text-[10px] font-bold mt-2 uppercase">Añadir imagen</span>
                    </button>
                </div>
            </div>
        </section>
    )
}
