import { GetInputProps, Reset } from '@mantine/form/lib/types';
import {
  Button, Flex, Group, NumberInput, Select,
} from '@mantine/core';
import { FilterParam, Filters } from '../../types';
import { capitalize } from '../../utils';

type FiltersProps = {
  filters: FilterParam[];
  getInputProps: GetInputProps<Filters>;
  onSubmit: (event?: React.FormEvent<HTMLFormElement> | undefined) => void;
  reset: Reset;
};

export default function FilterForm({
  filters,
  getInputProps,
  onSubmit,
  reset,
}: FiltersProps) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: '30%',
        height: 'fit-content',
        padding: '10px',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
      }}
    >
      <Flex direction="column" rowGap={20} align="center">
        <Flex direction="column" rowGap={20}>
          {filters.map(({ name, values, label }) => (
            <Select
              clearable
              searchable
              {...getInputProps(name)}
              key={name}
              label={capitalize(label)}
              data={values}
            />
          ))}
          <Flex columnGap={20}>
            <NumberInput
              {...getInputProps('price.min')}
              hideControls
              min={0}
              max={100}
              placeholder="from"
              label="Min price"
            />
            <NumberInput
              {...getInputProps('price.max')}
              hideControls
              min={0}
              max={100}
              placeholder="to"
              label="Max price"
            />
          </Flex>
        </Flex>
        <Group>
          <Button type="submit" color="orange">
            Apply filters
          </Button>
          <Button onClick={() => reset()} color="orange" variant="outline">
            Reset
          </Button>
        </Group>
      </Flex>
    </form>
  );
}
