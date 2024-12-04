import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface ServerSideToolbarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
}

const ServerSideToolbar: React.FC<ServerSideToolbarProps> = ({ value, onChange, clearSearch }) => {
  return (
    <Box display="flex" alignItems="center" padding={1}>
      <TextField
        variant="outlined"
        size="small"
        value={value}
        onChange={onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
          endAdornment: (
            <IconButton onClick={clearSearch}>
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default ServerSideToolbar;
