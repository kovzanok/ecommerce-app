import {
  Loader, Flex, Center, Title,
} from '@mantine/core';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { productsSelector } from '../../store/selectors';
import { fetchProducts } from '../../store/slices/productsSlice';
import ProductCard from '../../components/product-card';

export default function CatalogPage() {
  const { products, loading } = useAppSelector(productsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) {
    return (
      <Center h="100%">
        <Loader mt={100} size={100} color="orange" />
      </Center>
    );
  }
  if (!products?.length) {
    return (
      <Title ta="center" order={4}>
        No products
      </Title>
    );
  }
  return (
    <Flex
      rowGap={5}
      columnGap={5}
      align="start"
      justify="space-evenly"
      wrap="wrap"
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Flex>
  );
}
