import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi'; // Search icon from react-icons
import Button from './Button';

const Search = ({ resource }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { query: '' },
  });

  const query = watch('query'); // Watch the input field value

  // Synchronize input with search params
  useEffect(() => {
    const location = searchParams.get(resource) || '';
    setValue('query', location); // Set the initial value from search params
  }, [searchParams, resource, setValue]);

  // Handle form submission
  const onSubmit = ({ query }) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      searchParams.set(resource, trimmedQuery);
      searchParams.set('page', 1);
    } else {
      searchParams.delete(resource);
    }
    setSearchParams(searchParams);
  };

  // Handle clearing the search
  const handleClearSearch = () => {
    setValue('query', ''); // Clear the input
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
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2 items-center'>
      <div className='relative w-96'>
        <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' /> {/* Search icon */}
        <input
          type='text'
          {...register('query')}
          placeholder='Search...'
          className='pl-10 pr-12 p-2 border border-gray-300 rounded-full w-full' // Adjust padding for the icon and button
        />
        <button
          type='submit'
          className='absolute right-1 top-1/2 transform -translate-y-1/2 p-2 bg-primary text-white rounded-full'
        >
          <FiSearch />
        </button>
      </div>

      {/* Show Clear Button only if query has a value */}
      {query && (
        <Button
          type='button'
          size='md'
          variant='tertiary'
          onClick={handleClearSearch}
          className='ml-2 border border-gray-300 rounded-full p-2'
        >
          Clear
        </Button>
      )}
    </form>
  );
};

export default Search;
