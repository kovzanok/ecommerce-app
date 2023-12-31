import {
  AttributeDefinition,
  Category,
  ProductProjection,
} from '@commercetools/platform-sdk';
import { ProductsQuery } from '../../types';
import { createQueryString } from '../../utils';
import AuthModule from './auth-module';

export default class ProductsModule {
  static productTypeId = 'aa10f723-a1bc-4131-975d-f26f9174ecf3';

  static async getProducts({
    search,
    filters,
    sort,
    category,
    limit = 6,
    page,
  }: ProductsQuery): Promise<
    [ProductProjection[] | undefined, number | undefined] | undefined
    > {
    try {
      const queryString = createQueryString(filters);
      queryString.push(`categories.id: subtree("${category}")`);
      const {
        body: { results, total },
      } = await AuthModule.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'text.en-US': search,
            'filter.query': queryString,
            sort,
            limit,
            offset: (page - 1) * limit,
          },
        })
        .execute();
      return [results, total];
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }

  static async getProductAttributes() {
    try {
      const {
        body: { attributes },
      } = await AuthModule.apiRoot
        .productTypes()
        .withId({ ID: ProductsModule.productTypeId })
        .get()
        .execute();
      return attributes as AttributeDefinition[];
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }

  static async getCategories(): Promise<Category[]> {
    const {
      body: { results },
    } = await AuthModule.apiRoot.categories().get().execute();
    return results;
  }

  static async getCategoryById(id: string): Promise<Category> {
    const { body } = await AuthModule.apiRoot
      .categories()
      .withId({ ID: id })
      .get()
      .execute();
    return body;
  }

  static async getProductById(id: string): Promise<ProductProjection> {
    const { body } = await AuthModule.apiRoot
      .productProjections()
      .withId({ ID: id })
      .get()
      .execute();
    return body;
  }
}
