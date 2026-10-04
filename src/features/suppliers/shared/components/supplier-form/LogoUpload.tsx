import { FIELD_STYLE } from "@/src/shared/form"
import { IoCloudUpload } from "react-icons/io5"

export const LogoUpload = () => {

    // const fileRef = useRef<HTMLInputElement>(null);
    
    //     const logoUrl = watch("logoUrl");
    
    //     // Actualizamos la imagen 
    //     const onUploadImg = ({ target }: ChangeEvent<HTMLInputElement>) => {
    //         const files = target.files;
    //         if (!files) return;
    //         const file = files[0]
    //         const previewUrl = URL.createObjectURL(file);
    //         setValue("logoUrl", previewUrl, {shouldDirty:true})
            
    //     }
    
    //     // Eliminamos y actualizamos los valores
    //     const onRemove = () => {
    //         setValue("logoUrl", "", {shouldDirty:true})
    //     }

    return (
        <div className="space-y-2">
            <span className={FIELD_STYLE.label}>
                Logo Corporativo
            </span>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
                <div className="size-16 rounded-full bg-blue-500/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <IoCloudUpload size={35} />
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-[#111418] dark:text-white">
                        Haga clic para subir o arrastre el archivo
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        SVG, PNG, JPG (máx. 800x400px)
                    </p>
                </div>
                <input className="hidden" type="file" />
            </div>
        </div>
    )
}
