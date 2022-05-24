import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { City, ListParams } from 'models';
import { ChangeEvent, useRef } from 'react';

export interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilter({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: StudentFilterProps) {
  const searchInputRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      _page: 1,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };

  const handleCityChange = (e: SelectChangeEvent<string>) => {
    if (!onChange) return;
    const newFilter = {
      ...filter,
      city: e.target.value || undefined,
    };
    onChange(newFilter);
  };

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    if (!onChange) return;

    const value = e.target.value;
    const [sort, order] = value.split('.');

    const newFilter = {
      ...filter,
      _page: 1,
      _sort: sort || undefined,
      _order: (order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };

  const handleClear = () => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      name_like: undefined,
      city: undefined,
    };
    onChange(newFilter);

    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  return (
    <Box>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel htmlFor="search-by-name">Search</InputLabel>
            <OutlinedInput
              id="search-by-name"
              endAdornment={<Search />}
              label="Search"
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
              inputRef={searchInputRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="filterById">Filter By City</InputLabel>
            <Select
              labelId="filterById"
              label="Filter By City"
              value={filter.city || ''}
              onChange={handleCityChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              label="Sort"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>No Sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name Ascending</MenuItem>
              <MenuItem value="name.desc">Name Descending</MenuItem>
              <MenuItem value="mark.asc">Mark Ascending</MenuItem>
              <MenuItem value="mark.desc">Mark Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" onClick={handleClear}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
