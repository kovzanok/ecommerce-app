import { useEffect, useState } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { NavLink } from 'react-router-dom';
import {
  Button, Card, Drawer, Flex,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import ApiService from '../../service/api-service';
import { createCategoryMap } from '../../utils';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const matches = useMediaQuery('(max-width: 900px)');
  useEffect(() => {
    ApiService.getCategories().then(setCategories);
  }, []);

  const nestedCategories = createCategoryMap(categories);
  const nestedLinks: JSX.Element[] = [];
  nestedCategories.forEach((children, category) => {
    nestedLinks.push(
      <div key={category.id}>
        <NavLink
          onClick={close}
          style={{ textDecoration: 'none' }}
          to={`/catalog/${category.id}`}
        >
          {category.name['en-US']}
        </NavLink>
        <Flex mb={5} pl={20} direction="column">
          {children.map(({ id, name }) => (
            <NavLink
              onClick={close}
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
  const categoriesCard = <Card withBorder>{nestedLinks}</Card>;
  return (
    <div>
      {matches ? (
        <div>
          <Drawer opened={opened} onClose={close} title="Categories">
            {categoriesCard}
          </Drawer>
          <Button
            left="15px"
            size="md"
            color="orange"
            style={{ zIndex: 10 }}
            pos="fixed"
            bottom="5%"
            onClick={open}
          >
            Categories
          </Button>
        </div>
      ) : (
        categoriesCard
      )}
    </div>
  );
}
