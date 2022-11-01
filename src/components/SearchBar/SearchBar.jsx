import PropTypes from 'prop-types';
import { BiSearchAlt } from 'react-icons/bi';

import {
  SearchBarHTML,
  FormHTML,
  ButtonHTML,
  ButtonLabelHTML,
  InputHTML,
} from './SearchBar.styled';

export const SearchBar = ({ handleSubmit }) => {
  const onSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    handleSubmit(form.elements.query.value);
    form.reset();
  };

  return (
    <SearchBarHTML>
      <FormHTML onSubmit={onSubmit}>
        <ButtonHTML type="submit">
          <BiSearchAlt style={{ width: 32, height: 32 }} />
          <ButtonLabelHTML>Search</ButtonLabelHTML>
        </ButtonHTML>

        <InputHTML
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </FormHTML>
    </SearchBarHTML>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
