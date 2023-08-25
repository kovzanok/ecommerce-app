import { useEffect, useState } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { NavLink } from 'react-router-dom';
import { Card, Flex } from '@mantine/core';
import ApiService from '../../service/api-service';
import { createCategoryMap } from '../../utils';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    ApiService.getCategories().then(setCategories);
  }, []);

  const nestedCategories = createCategoryMap(categories);
  const nestedLinks: JSX.Element[] = [];
  nestedCategories.forEach((children, category) => {
    nestedLinks.push(
      <div key={category.id}>
        <NavLink
          style={{ textDecoration: 'none' }}
          to={`/catalog/${category.id}`}
        >
          {category.name['en-US']}
        </NavLink>
        <Flex mb={5} pl={20} direction="column">
          {children.map(({ id, name }) => (
            <NavLink
              style={{ textDecoration: 'none' }}
              to={`/catalog/${id}`}
              key={id}
            >
              {name['en-US']}
            </NavLink>
          ))}
        </Flex>
      </div>,
    );
  });
  return <Card withBorder>{nestedLinks}</Card>;
}
