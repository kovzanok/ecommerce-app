import { Button, Flex, TextInput } from '@mantine/core';
import { IconSearch, IconSquareX } from '@tabler/icons-react';

type SearchBarProps = {
  handleSearch: React.FormEventHandler<HTMLFormElement>;
  handleClear: () => void;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  loading: boolean;
  value: string;
};

export default function SearchBar({
  handleSearch,
  handleClear,
  handleChange,
  loading,
  value,
}: SearchBarProps) {
  return (
    <form style={{ width: '100%' }} onSubmit={handleSearch}>
      <Flex w="100%" columnGap={30}>
        <TextInput
          rightSection={<IconSquareX style={{ cursor: 'pointer' }} />}
          rightSectionProps={{
            onClick: handleClear,
          }}
          disabled={loading}
          w="95%"
          icon={<IconSearch />}
          placeholder="Search..."
          value={value}
          onChange={handleChange}
        />
        <Button disabled={loading} type="submit" color="orange">
          Search
        </Button>
      </Flex>
    </form>
  );
}
