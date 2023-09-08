import { DiscountCodeReference } from '@commercetools/platform-sdk';
import { ActionIcon, Badge, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { updateCart } from '../../store/slices/cartSlice';
import { useAppDispatch } from '../../hooks';

type ActivatedPromocodeProps = {
  promoName: string;
  discountCode: DiscountCodeReference;
};

function ActivatedPromocode({
  promoName,
  discountCode,
}: ActivatedPromocodeProps) {
  const dispatch = useAppDispatch();

  const removePromocodeButton = (
    <ActionIcon
      size="xs"
      color="orange"
      radius="xl"
      variant="transparent"
      onClick={() => {
        dispatch(
          updateCart([
            {
              action: 'removeDiscountCode',
              discountCode,
            },
          ]),
        );
      }}
    >
      <IconX size={rem(10)} />
    </ActionIcon>
  );

  return (
    <Badge color="orange" rightSection={removePromocodeButton}>
      {promoName}
    </Badge>
  );
}

export default ActivatedPromocode;
