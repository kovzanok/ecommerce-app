import { ProductProjection } from '@commercetools/platform-sdk';
import BaseModule from '../../utils/base-module';

export default class ProductsModule extends BaseModule {
  static async getProducts(): Promise<ProductProjection[] | undefined> {
    try {
      const {
        body: { results },
      } = await ProductsModule.apiRoot
        .productProjections()
        .search()
        .get()
        .execute();
      return results;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
}
