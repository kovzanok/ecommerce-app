import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import {
  Button, Flex, Paper, TextInput, Title,
} from '@mantine/core';
import { DiscountCode } from '@commercetools/platform-sdk';
import { updateCart } from '../../store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cartSelector } from '../../store/selectors';
import ActivatedPromocode from '../activated-promocode';
import ApiService from '../../service/api-service';

function Promocode() {
  const matches = useMediaQuery('(max-width: 62em)');
  const [promocode, setPromocode] = useState<string>('');

  const dispatch = useAppDispatch();

  const { cart } = useAppSelector(cartSelector);

  const isPromocodesNotEmpty = cart?.discountCodes.length !== 0;

  useEffect(() => {
    if (cart && isPromocodesNotEmpty) {
      ApiService.getPromocodeById(cart.discountCodes[0].discountCode.id).then(
        (promocodeResponse: DiscountCode | undefined) => {
          if (promocodeResponse !== undefined) {
            setPromocode(promocodeResponse.code || '');
          }
        },
      );
    }
  }, [cart]);

  return (
    <Paper
      h="auto"
      w={matches ? '100%' : 'auto'}
      style={{ flex: '1' }}
      mt="xs"
      shadow="xs"
      p="xs"
    >
      <Flex direction="column" gap={20}>
        <Title>Promocode</Title>

        {cart && isPromocodesNotEmpty && (
          <ActivatedPromocode
            promoName={promocode}
            discountCode={cart?.discountCodes[0].discountCode}
          />
        )}

        <TextInput
          disabled={isPromocodesNotEmpty}
          placeholder="Write promocode here..."
          value={promocode}
          onChange={(e) => setPromocode(e.target.value)}
        />
        <Button
          color="orange"
          disabled={isPromocodesNotEmpty || promocode === ''}
          onClick={() => {
            dispatch(
              updateCart([{ action: 'addDiscountCode', code: promocode }]),
            )
              .unwrap()
              .catch((err) => {
                alert(err.message);
                setPromocode('');
              });
          }}
        >
          Apply
        </Button>
      </Flex>
    </Paper>
  );
}

export default Promocode;
