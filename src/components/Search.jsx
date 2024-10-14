import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from './Button';

const Search = ({ resource }) => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  // Synchronize input with search params
  useEffect(() => {
    const location = searchParams.get(resource) || '';
    setQuery(location);
  }, [searchParams]);

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchParams.set(resource, query);
    } else {
      searchParams.delete(resource);
    }
    setSearchParams(searchParams);
  };

  // Handle clearing the search
  const handleClearSearch = () => {
    setQuery(''); // Clear the input
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(resource);

    // Remove the query string if there are no params left
    if (!Array.from(newParams).length) {
      setSearchParams({});
    } else {
      setSearchParams(newParams);
    }
  };

  return (
    <form onSubmit={handleSearch} className='flex gap-2 items-center'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search...'
        className='p-2 border border-gray-300 rounded-md w-96'
      />
      <Button type='button' size='md' variant='cancel' onClick={handleClearSearch}>
        Clear search
      </Button>
      <Button type='submit' size='md' variant='primary'>
        Search
      </Button>
    </form>
  );
};

export default Search;
