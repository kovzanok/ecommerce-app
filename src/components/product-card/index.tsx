import {
  MyCartUpdateAction,
  ProductProjection,
} from '@commercetools/platform-sdk';
import {
  Flex, Text, Card, Title, Button, Loader,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { useHover } from '@mantine/hooks';
import { AuthorType, PublishedType } from '../../types';
import { getProductAttribute } from '../../utils';
import PriceContent from '../price-content';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCart } from '../../store/slices/cartSlice';
import { cartSelector } from '../../store/selectors';

type ProductCardProps = ProductProjection;

export default function ProductCard({
  id,
  name,
  description,
  masterVariant: {
    id: variantId, prices, images, attributes,
  },
}: ProductCardProps) {
  const { loading, cart } = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();
  const { hovered, ref } = useHover();
  const price = prices && prices[0];
  const mainImage = images && images[0].url;
  const author = getProductAttribute<AuthorType>(attributes, 'Author');
  const published = getProductAttribute<PublishedType>(attributes, 'Published');
  const engDescription = description && description['en-US'];

  const priceContent = price ? <PriceContent price={price} /> : null;
  const action: MyCartUpdateAction = {
    action: 'addLineItem',
    productId: id,
    variantId,
  };

  const isItemAdded = Boolean(
    cart?.lineItems.find((item) => item.productId === id),
  );
  return (
    <NavLink style={{ textDecoration: 'none' }} to={`/product/${id}`}>
      <Card
        shadow={hovered ? '0px 0px 22px 0px rgba(0,0,0,1)' : ''}
        style={{
          border: hovered ? '1px solid black' : '',
        }}
        ref={ref}
        ta="center"
        withBorder
        w={250}
      >
        <Flex
          align="center"
          h="100%"
          direction="column"
          justify="space-between"
        >
          <img width="60%" height="200px" alt={name['en-US']} src={mainImage} />
          {priceContent}
          <Flex mt={5} ta="center" direction="column">
            <Title h={50} order={5}>
              {name['en-US'].length >= 34
                ? `${name['en-US'].slice(0, 34)}...`
                : name['en-US']}
            </Title>
            <Text fz={12} color="gray">
              {author.value.label}
              ,
              {published.value}
            </Text>
            <Text fz={14}>
              {engDescription?.slice(0, engDescription.indexOf(' ', 55))}
              ...
            </Text>
          </Flex>
        </Flex>
        <Button
          disabled={isItemAdded || loading}
          onClick={(e) => {
            e.preventDefault();
            dispatch(updateCart([action]));
          }}
        >
          {(loading && <Loader />) || isItemAdded
            ? 'Added to cart'
            : 'Add to cart'}
        </Button>
      </Card>
    </NavLink>
  );
}
