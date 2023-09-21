import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Breadcrumbs } from '@mantine/core';
import { Category } from '@commercetools/platform-sdk';
import ApiService from '../../service/api-service';
import booksCategoryId from '../../utils/const';

export default function CustomBreadcrumbs() {
  const [categoryChain, setCategory] = useState<Category[]>([]);
  const { category = booksCategoryId } = useParams();

  useEffect(() => {
    ApiService.getCategoryChain(category).then(setCategory).catch(console.log);
  }, [category]);

  return (
    <Breadcrumbs my={30} separator="→">
      {categoryChain.map(({ id, name }) => (
        <NavLink
          style={{ textDecoration: 'none' }}
          key={id}
          to={`/catalog/${id}`}
        >
          {name['en-US']}
        </NavLink>
      ))}
    </Breadcrumbs>
  );
}
