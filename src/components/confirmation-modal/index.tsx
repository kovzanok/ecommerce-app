import {
  Modal, Flex, Button, Text,
} from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCart } from '../../store/slices/cartSlice';
import { cartSelector } from '../../store/selectors';

export type ConfirmationModalProps = {
  opened: boolean;
  close: () => void;
};

export default function ConfirmationModal({
  opened,
  close,
}: ConfirmationModalProps) {
  const { cart } = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();

  const removeAllFromCart = () => {
    if (cart) {
      dispatch(
        updateCart(
          cart.lineItems.map((item) => ({
            action: 'removeLineItem',
            lineItemId: item.id,
          })),
        ),
      );
    }
  };

  return (
    <Modal centered opened={opened} onClose={close} title="Confirmation">
      <Text>Do you really want to delete your basket ?</Text>

      <Flex mt={20} direction="row" gap={10}>
        <Button
          w="100%"
          color="orange"
          onClick={() => {
            removeAllFromCart();
            close();
          }}
        >
          Yes
        </Button>
        <Button w="100%" color="orange" onClick={close}>
          No
        </Button>
      </Flex>
    </Modal>
  );
}
