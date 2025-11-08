const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DOMAIN_NAME = import.meta.env.VITE_API_DOMAIN_NAME;
export const api = DOMAIN_NAME
const baseApi = BASE_URL
export const signInApi = `${baseApi}/login`;
export const orderList = `${baseApi}/order/list`;
export const productList = `${baseApi}/product-list`;
export const subscriberListApi = `${baseApi}/subscriber/list`;
export const categoryListApi = `${baseApi}/category/list`;
export const userApi = `${baseApi}/user`;




export const currency_symbol = "৳"
export const conversion_rate_to_tk = "0"
// ToasterPosition
export const toastr_position = "top-right"