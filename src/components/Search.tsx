import React, { useState, useEffect, useContext } from 'react';
import { Search as SearchIcon, Close } from 'icons';
import { useDispatch } from 'react-redux';
import { search as _search } from 'actions/_search';
import { useHistory } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { ThemeProps } from 'interfaces';

const routes = ['/movies', '/series', '/search', '/home'];

const SearchWrapper = styled.div`
  margin-bottom: 4rem;

  .show-search {
    display: block;
  }

  .hide-search {
    display: none;
  }
  form {
    height: 6rem;
    width: 100%;
    margin: 2rem 3.5%;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.08);

    .close-btn {
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.5s ease;
      cursor: pointer;
    }

    .show-close-btn {
      visibility: visible;
      opacity: 1;
    }

    .search-icon {
      cursor: pointer;
    }

    input {
      flex-grow: 1;
      padding: 1rem 0;
      margin: 0 2rem;
      border: none;
      font-size: 1.6rem;
      font-weight: 200;
    }
  }
`;

const Search: React.FC = () => {
  const history = useHistory();
  const dispatchAction = useDispatch();
  const theme: ThemeProps = useContext(ThemeContext);
  const [search, setSearch] = useState<string>('');
  const [isFormFocused, setFormStatus] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent): void => e.preventDefault();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearch(value);
  };

  useEffect(() => {
    let routeFound = false;
    for (let index = 0; index < routes.length; index++) {
      if (routes[index] === history.location.pathname) {
        routeFound = true;
      }
    }

    if (routeFound) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [history.location.pathname]);

  useEffect(() => {
    if (isFormFocused) {
      history.push('/search');
    }
  }, [isFormFocused]);

  useEffect(() => {
    if (search !== '') {
      dispatchAction(_search(search));
    }
  }, [search]);

  return (
    <SearchWrapper
      style={{ display: `${status ? 'block' : 'none'}` }}
      onClick={() => setFormStatus(true)}
      onBlur={() => {
        setFormStatus(false);
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className='search-icon'>
          <SearchIcon
            width={25}
            height={25}
            color={theme.secondaryTextColour}
          />
        </div>
        <input
          className='input'
          type='text'
          placeholder='Search...'
          value={search}
          onChange={handleInputChange}
        />
        <div
          className={`${search.trim().length > 1 &&
            'show-close-btn'} close-btn`}
          onClick={() => {
            setSearch('');
          }}
        >
          <Close width={25} height={25} color={theme.secondaryTextColour} />
        </div>
      </form>
    </SearchWrapper>
  );
};

export default Search;
