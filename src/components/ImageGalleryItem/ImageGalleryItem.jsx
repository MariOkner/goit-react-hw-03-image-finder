import { ItemHTML, ImgHTML } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImageURL, largeImageURL }) => {
  return (
    <ItemHTML>
      <ImgHTML src={smallImageURL} alt="" />
    </ItemHTML>
  );
};
