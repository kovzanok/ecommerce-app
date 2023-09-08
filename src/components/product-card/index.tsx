import { ProductProjection } from '@commercetools/platform-sdk';
import {
  Flex, Text, Card, Title, Button, Loader,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { useHover } from '@mantine/hooks';
import { AuthorType, PublishedType } from '../../types';
import { getProductAttribute } from '../../utils';
import PriceContent from '../price-content';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cartSelector } from '../../store/selectors';
import { updateCart } from '../../store/slices/cartSlice';

type ProductCardProps = ProductProjection;

export default function ProductCard({
  id,
  name,
  description,
  masterVariant: { prices, images, attributes },
}: ProductCardProps) {
  const { hovered, ref } = useHover();
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector(cartSelector);
  const price = prices && prices[0];
  const mainImage = images && images[0].url;
  const author = getProductAttribute<AuthorType>(attributes, 'Author');
  const published = getProductAttribute<PublishedType>(attributes, 'Published');
  const engDescription = description && description['en-US'];

  const priceContent = price ? <PriceContent price={price} /> : null;

  const addToCart: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(updateCart([{ action: 'addLineItem', productId: id }]));
  };
  const isProductAdded = cart?.lineItems.some(
    ({ productId }) => productId === id,
  );
  const buttonContent = () => {
    switch (true) {
      case loading:
        return <Loader size="xs" color="orange" />;
      case isProductAdded:
        return 'Already in cart';
      default:
        return 'Add to cart';
    }
  };
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
          disabled={isProductAdded || loading}
          onClick={addToCart}
          mt={10}
          size="xs"
          color="orange"
        >
          {buttonContent()}
        </Button>
      </Card>
    </NavLink>
  );
}
