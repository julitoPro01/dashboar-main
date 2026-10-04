import { ImageGallery } from "./gallery/ImageGallery"

interface Props {isEdit?:boolean, isSubmitting?:boolean}

export const Gallery = (props: Props) => {
    
    return (
        
        <ImageGallery {...props} />
    )
}
