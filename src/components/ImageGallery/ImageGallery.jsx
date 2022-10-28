import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'

import {ImageGalleryList} from './ImageGallery.styled'

export const ImageGallery = ({ images }) => {
    return (
        <ImageGalleryList class="gallery">
            {images.map(({ image }) => (
                <ImageGalleryItem />
            )).join('')
            }
        </ImageGalleryList>
    );
};

