import {
  Modal, Flex, Button, Text,
} from '@mantine/core';

type ConfirmationModalProps = {
  opened: boolean;
  close: () => void;
  removeAllFromCart: () => void;
};

export default function ConfirmationModal({
  opened,
  close,
  removeAllFromCart,
}: ConfirmationModalProps) {
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
