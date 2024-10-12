import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const useCloseModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const closeModal = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('modal');
    newParams.delete('resource_id');
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  return closeModal;
};

export default useCloseModal;
