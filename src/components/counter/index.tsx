import { useRef, useState } from 'react';
import {
  ActionIcon,
  Group,
  NumberInput,
  NumberInputHandlers,
  rem,
} from '@mantine/core';
import { useTimeout } from '@mantine/hooks';
import { useAppDispatch } from '../../hooks';
import { updateCart } from '../../store/slices/cartSlice';

type CounterProps = {
  id: string;
  initialValue: number;
};

function Counter({ id, initialValue }: CounterProps) {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number>(initialValue);
  const previousValue = useRef<number>(initialValue);

  const updateLineItemQuantity = () => {
    if (previousValue.current !== value) {
      dispatch(
        updateCart([
          {
            action: 'changeLineItemQuantity',
            lineItemId: id,
            quantity: value,
          },
        ]),
      );

      previousValue.current = value;
    }
  };

  const { start, clear } = useTimeout(updateLineItemQuantity, 1000);
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Group spacing={5}>
      <ActionIcon
        size={42}
        disabled={+value === 1}
        variant="default"
        onClick={() => {
          handlers.current?.decrement();
          clear();
          start();
        }}
      >
        –
      </ActionIcon>

      <NumberInput
        hideControls
        value={value}
        onFocus={() => clear()}
        onBlur={updateLineItemQuantity}
        onChange={(val) => setValue(+val)}
        handlersRef={handlers}
        min={1}
        step={1}
        styles={{ input: { width: rem(54), textAlign: 'center' } }}
      />

      <ActionIcon
        size={42}
        variant="default"
        onClick={() => {
          handlers.current?.increment();
          clear();
          start();
        }}
      >
        +
      </ActionIcon>
    </Group>
  );
}

export default Counter;
