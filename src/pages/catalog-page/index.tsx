import {
  Loader, Flex, Center, Title, TextInput, Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { IconSearch, IconSquareX } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { productsSelector } from '../../store/selectors';
import { fetchProducts } from '../../store/slices/productsSlice';
import ProductCard from '../../components/product-card';
import FilterForm from '../../components/filters';
import { FilterParam, Filters } from '../../types';
import { getFilterParams } from '../../utils';
import ProductsModule from '../../service/modules/products-module';

const initialValues: Filters = {
  Age_restrictions: '',
  Author: '',
  publisher: '',
  Cover: '',
  price: {
    min: 0,
    max: 100,
  },
};

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterParam[]>([]);
  const {
    getInputProps, onSubmit, reset, values,
  } = useForm({ initialValues });
  const { products, loading } = useAppSelector(productsSelector);
  const dispatch = useAppDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(fetchProducts({ search, filters: values }));
    ProductsModule.getProductAttributes()
      .catch(console.log)
      .then((res) => res && setFilters(getFilterParams(res)));
  }, []);

  let content: JSX.Element;

  switch (true) {
    case loading:
      content = (
        <Center h="100%">
          <Loader mt={100} size={100} color="orange" />
        </Center>
      );
      break;
    case products.length === 0:
      content = (
        <Title ta="center" order={4}>
          No products
        </Title>
      );
      break;
    default:
      content = (
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(fetchProducts({ search, filters: values }));
  };

  const applyFilters = onSubmit((appliedFilters) => dispatch(fetchProducts({ search, filters: appliedFilters })));

  return (
    <Flex columnGap={30}>
      <FilterForm
        loading={loading}
        reset={reset}
        onSubmit={applyFilters}
        getInputProps={getInputProps}
        filters={filters}
      />
      <div style={{ width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <Flex w="100%" columnGap={30} mb={30}>
            <TextInput
              rightSection={<IconSquareX style={{ cursor: 'pointer' }} />}
              rightSectionProps={{
                onClick: () => {
                  setSearch('');
                },
              }}
              disabled={loading}
              w="95%"
              icon={<IconSearch />}
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Button type="submit" color="orange">
              Search
            </Button>
          </Flex>
        </form>
        {content}
      </div>
    </Flex>
  );
}
