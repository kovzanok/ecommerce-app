import { Select } from '@mantine/core';
import { Sorting } from '../../types';

type SortSelectProps = {
  loading: boolean;
  value: Sorting;
  handleChange: (value: string | null) => void;
};

export default function SortSelect({
  loading,
  value,
  handleChange,
}: SortSelectProps) {
  const sortingOptions: { value: Sorting; label: string }[] = [
    { value: 'name.en-US asc', label: 'A-Z' },
    { value: 'name.en-US desc', label: 'Z-A' },
    { value: 'price asc', label: 'Price ↑' },
    { value: 'price desc', label: 'Price ↓' },
  ];
  return (
    <Select
      color="orange"
      disabled={loading}
      onChange={handleChange}
      value={value}
      data={sortingOptions}
      label="Sorting"
    />
  );
}
