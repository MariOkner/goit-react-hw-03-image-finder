import {GalleryItem, GalleryImg} from './ImageGalleryItem.styled'

export const ImageGalleryItem = ({ objectID, webformatURL }) => {
    return(
        <GalleryItem key={objectID}>
            <GalleryImg src={webformatURL} alt="" />
        </GalleryItem>
    )
}