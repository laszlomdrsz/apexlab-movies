import {Box, IconButton, InputBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, {useState} from 'react';

interface SearchProps {
  onSubmit: (value: string) => any;
  defaultValue?: string;
}

const Search = ({onSubmit, defaultValue = ''}: SearchProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        mx="auto"
        my={1}
        px={1}
        display="flex"
        bgcolor="#fff3"
        width="max-content"
        maxWidth={1}
        borderRadius={1}
      >
        <InputBase
          required
          value={value}
          placeholder="Type here to search"
          onChange={handleChange}
          sx={{color: '#fff', width: 500, maxWidth: 1}}
        />
        <IconButton type="submit">
          <SearchIcon sx={{color: '#fff'}} />
        </IconButton>
      </Box>
    </form>
  );
};

export default Search;
