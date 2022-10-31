import { ColorRing } from 'react-loader-spinner';
import { LoaderHTML } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderHTML>
      <ColorRing />
    </LoaderHTML>
  );
};
