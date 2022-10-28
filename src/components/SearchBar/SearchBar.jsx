import { SearchbarHeader, Form, Button, ButtonLabel, Input } from './SearchBar.styled';

export const SearchBar = ({ handleSubmit }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    handleSubmit(form.elements.query.value);
    form.reset();
  };

  return (
    <SearchbarHeader>
      <Form onSubmit={onSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
          SE
        </Button>

        <Input
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarHeader>
  );
};
