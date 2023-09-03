import { MyCartUpdateAction } from '@commercetools/platform-sdk';
import AuthModule from './auth-module';

export default class CartModule {
  static async checkCart() {
    try {
      const { body } = await AuthModule.apiRoot
        .me()
        .activeCart()
        .get()
        .execute();
      return body;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }

  static async createCart() {
    const { body } = await AuthModule.apiRoot
      .me()
      .carts()
      .post({ body: { currency: 'USD' } })
      .execute();
    return body;
  }

  static async modifyCart({
    id,
    actions,
    version,
  }: {
    id: string;
    actions: MyCartUpdateAction[];
    version: number;
  }) {
    const { body } = await AuthModule.apiRoot
      .me()
      .carts()
      .withId({ ID: id })
      .post({ body: { actions, version } })
      .execute();
    return body;
  }

  static async deleteCart({ id, version }: { id: string; version: number }) {
    await AuthModule.apiRoot
      .me()
      .carts()
      .withId({ ID: id as string })
      .delete({
        queryArgs: { version },
      })
      .execute();
  }
}
