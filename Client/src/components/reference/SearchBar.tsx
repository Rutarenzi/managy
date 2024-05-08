import { Input } from '@chakra-ui/react';
import React, { FormEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
  const [search, setSearch] = React.useState('');
  const [expand, setExpand] = React.useState(false);
  const searchRef = React.useRef<HTMLInputElement>(null);

  const handleSearch = (e?: FormEvent) => {
    e?.preventDefault();
    console.log(search);
  };

  // const su
  // expand search bar when on mobile device as it is hidden by default and visibale in lg and xl screens
  const handleExpand = () => {
    if (expand && search !== '') {
      handleSearch();
    } else {
      setExpand(true);
      searchRef.current?.focus();
    }
  };

  return (
    <>
      {expand && (
        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          onClick={() => setExpand(false)}
        />
      )}
      <div className="relative z-10 flex flex-row-reverse w-full max-w-[300px]">
        <MagnifyingGlassIcon
          className=" absolute md:hidden w-6 cursor-pointer m-2"
          onClick={handleExpand}
        />
        <MagnifyingGlassIcon
          className=" absolute md:flex hidden w-6 cursor-pointer m-2"
          onClick={handleSearch}
        />
        <form
          onSubmit={handleSearch}
          className={` ${
            expand ? 'w-full' : 'w-0 md:w-full'
          } overflow-hidden transition-all duration-500 bg-white rounded-md`}
        >
          <input
            ref={searchRef}
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // onBlur={() => setExpand(false)}
            className={`${
              expand ? 'w-full' : 'w-0 md:w-full'
            } focus:border-secondary py-1.5 px-2  outline-none appearance-none border-2 rounded-md pr-9 bg-white`}
          />
        </form>
      </div>
    </>
  );
};

export default SearchBar;
