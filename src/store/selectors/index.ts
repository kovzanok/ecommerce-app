import { RootState } from '..';

const userSelector = (state: RootState) => state.user;
export const productsSelector = (state: RootState) => state.products;
export const productSelector = (state: RootState) => state.product;
export default userSelector;
