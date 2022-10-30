import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

import { ImageGalleryHTML } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryHTML>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          smallImageURL={image.smallImageURL}
          largeImageURL={image.largeImageURL}
        />
      ))}
    </ImageGalleryHTML>
  );
};
