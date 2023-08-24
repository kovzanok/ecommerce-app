import {
  AttributeDefinition,
  ProductProjection,
} from '@commercetools/platform-sdk';
import BaseModule from '../../utils/base-module';
import { ProductsQuery } from '../../types';

export default class ProductsModule extends BaseModule {
  static productTypeId = 'aa10f723-a1bc-4131-975d-f26f9174ecf3';

  static async getProducts({
    search,
  }: ProductsQuery): Promise<ProductProjection[] | undefined> {
    try {
      const {
        body: { results },
      } = await ProductsModule.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: { 'text.en-US': search },
        })
        .execute();
      return results;
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
      } = await ProductsModule.apiRoot
        .productTypes()
        .withId({ ID: ProductsModule.productTypeId })
        .get()
        .execute();
      return attributes as AttributeDefinition[];
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
}
