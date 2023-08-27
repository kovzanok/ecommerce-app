import {
  Loader, Flex, Center, Title, MediaQuery,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { productsSelector } from '../../store/selectors';
import { fetchProducts } from '../../store/slices/productsSlice';
import ProductCard from '../../components/product-card';
import FilterForm from '../../components/filters';
import { FilterParam, Filters, Sorting } from '../../types';
import { getFilterParams } from '../../utils';
import SortSelect from '../../components/sort-select';
import ProductsModule from '../../service/modules/products-module';
import SearchBar from '../../components/search-bar';
import Categories from '../../components/categories';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import booksCategoryId from '../../utils/const';

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
  const { category = booksCategoryId } = useParams();
  const [sort, setSort] = useState<Sorting>('name.en-US asc');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterParam[]>([]);
  const {
    getInputProps, onSubmit, reset, values,
  } = useForm({ initialValues });
  const { products, loading } = useAppSelector(productsSelector);
  const dispatch = useAppDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(
      fetchProducts({
        search,
        filters: values,
        sort,
        category,
      }),
    );
    ProductsModule.getProductAttributes()
      .catch(console.log)
      .then((res) => res && setFilters(getFilterParams(res)))
      .catch();
  }, [category]);

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
    dispatch(
      fetchProducts({
        search,
        filters: values,
        sort,
        category,
      }),
    );
  };

  const applyFilters = onSubmit((appliedFilters) => dispatch(
    fetchProducts({
      search,
      filters: appliedFilters,
      sort,
      category,
    }),
  ));
  const handleChange = (value: string | null) => {
    setSort(value as Sorting);
    dispatch(
      fetchProducts({
        search,
        filters: values,
        sort: value as Sorting,
        category,
      }),
    );
  };

  return (
    <Flex pb={60} columnGap={30}>
      <Flex rowGap={10} direction="column">
        <Categories />
        <FilterForm
          loading={loading}
          reset={reset}
          onSubmit={applyFilters}
          getInputProps={getInputProps}
          filters={filters}
        />
      </Flex>

      <div style={{ width: '100%' }}>
        <MediaQuery query="(max-width:580px)" styles={{ flexWrap: 'wrap' }}>
          <Flex mb={20} align="end" justify="center" columnGap={20} rowGap={10}>
            <SortSelect
              handleChange={handleChange}
              value={sort}
              loading={loading}
            />
            <SearchBar
              loading={loading}
              value={search}
              handleChange={(e) => {
                setSearch(e.target.value);
              }}
              handleClear={() => {
                setSearch('');
              }}
              handleSearch={handleSubmit}
            />
          </Flex>
        </MediaQuery>

        <CustomBreadcrumbs />
        {content}
      </div>
    </Flex>
  );
}
