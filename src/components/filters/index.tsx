import { GetInputProps, Reset } from '@mantine/form/lib/types';
import {
  Button, Flex, Group, Modal, NumberInput, Select,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { FilterParam, Filters } from '../../types';
import { capitalize } from '../../utils';

type FiltersProps = {
  filters: FilterParam[];
  loading: boolean;
  getInputProps: GetInputProps<Filters>;
  onSubmit: (event?: React.FormEvent<HTMLFormElement> | undefined) => void;
  reset: Reset;
};

export default function FilterForm({
  filters,
  getInputProps,
  onSubmit,
  loading,
  reset,
}: FiltersProps) {
  const matches = useMediaQuery('(max-width: 900px)');
  const [opened, { open, close }] = useDisclosure(false);
  const form = (
    <form
      onSubmit={(e) => {
        onSubmit(e);
        close();
      }}
      style={{
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
              disabled={loading}
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
              disabled={loading}
              {...getInputProps('price.min')}
              hideControls
              min={0}
              max={100}
              placeholder="from"
              label="Min price"
            />
            <NumberInput
              disabled={loading}
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
          <Button disabled={loading} type="submit" color="orange">
            Apply filters
          </Button>
          <Button
            disabled={loading}
            onClick={() => reset()}
            color="orange"
            variant="outline"
          >
            Reset
          </Button>
        </Group>
      </Flex>
    </form>
  );

  return (
    <div>
      {matches ? (
        <div>
          <Modal opened={opened} title="Filters" onClose={close}>
            {form}
          </Modal>
          <Button
            onClick={open}
            size="md"
            style={{ zIndex: 10, transform: 'translate(-50%, 0)' }}
            pos="fixed"
            left="50%"
            bottom="5%"
            color="orange"
          >
            Filters
          </Button>
        </div>
      ) : (
        form
      )}
    </div>
  );
}
