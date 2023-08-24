import { ProductProjection } from '@commercetools/platform-sdk';
import BaseModule from '../../utils/base-module';
import { ProductsQuery } from '../../types';

export default class ProductsModule extends BaseModule {
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
}
