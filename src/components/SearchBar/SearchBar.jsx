import { useState } from 'react';
import { Button, Icon } from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onChangeForm = e => {
    const value = e.target.value;
    setQuery(value);
  };

  const handelSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handelSubmit}>
        <Button type="submit" className="SearchForm-button">
          <Icon />
          <span className="SearchForm-button-label">Search</span>
        </Button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChangeForm}
        />
      </form>
    </header>
  );
};
