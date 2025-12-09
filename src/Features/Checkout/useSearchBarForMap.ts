import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

export const useSearchBarForMap = ({
  handleSearch,
}: {
  handleSearch: (e: any) => void;
}) => {
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== '') {
      setIsOpen(true); // <-- add this
    }

    handleSearch(e);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(query);
    setIsOpen(false);
  };
  return {
    dropdownRef,
    handleSubmit,
    query,
    handleInputChange,
    setIsOpen,
    isOpen,
    setQuery,
  };
};
