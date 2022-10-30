import { ButtonHTML } from './Button.styled';

export const Button = ({ handleClick }) => {
  return (
    <ButtonHTML type="button" onClick={handleClick}>
      Load more
    </ButtonHTML>
  );
};
