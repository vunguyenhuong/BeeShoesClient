export const baseUrl = "http://localhost:8080/client/";
export const baseUrlLogin = "http://localhost:8080/";
const API = {
  // Authentication
  login: () => baseUrlLogin + `login-v2/singin`,
  register: () => baseUrlLogin + `login-v2/singup`,
  changePassword: () => baseUrlLogin + `login-v2/change-password`,
  forgot: () => baseUrlLogin + `login-v2/reset-password`,
  // thương hiệu
  getBrand: () => baseUrl + "api/brand",
  getBrandChoose: (id: number, page: number, sizePage: number) =>
    baseUrl + `api/shoe?brand=${id}&page=${page}&sizePage=${sizePage}`,
  getBrandAllPage: (page: number, sizePage: number) =>
    baseUrl + `api/brand?page=${page}&sizePage=${sizePage}`,
  getBrandWithId: (id: number) => baseUrl + `api/brand/${id}`,
  // size
  getSize: (page: number) => baseUrl + `api/size?page=${page}&sizePage=${10}`,
  getSizeAll: () => baseUrl + `api/size?page=1&sizePage=1000000`,
  getSizePage: (page: number) => baseUrl + `api/size?page=${page}`,
  //
  getColor: () => baseUrl + `api/color`,
  getColorPage: (page: number) => baseUrl + `api/color?page=${page}`,
  getAllColors: () => baseUrl + `api/color?page=1&sizePage=100000`,

  // Danh mục
  getSole: () => baseUrl + "api/sole",
  getProuductSame: (sole: number | string, brand: number | string) =>
    baseUrl +
    `api/shoe?brand=${brand}&category=${sole}&page=${1}&sizePage=${20}`,
  // sản phẩm
  getShoe: (page: number, sizePage: number) =>
    baseUrl + `api/shoe?page=${page}&sizePage=${sizePage}`,
  getIDWithName: (name: string) => baseUrl + `api/brand?name=${name}`,
  getTopSale: (top: number) => baseUrl + `api/shoe/top-sell?top=${top}`,
  getShoesImg: () => baseUrl + "api/images",
  getShoeDetail: (shoe: number) =>
    baseUrl + `api/shoe-detail?shoe=${shoe}$sizePage=${100}`,
  getAllShoeDetail: () => baseUrl + `api/shoe-detail?sizePage=100000`,
  getShoeWithId: (shoe: number) => baseUrl + `api/shoe/${shoe}`,
  getShoeDetailWithId: (id: number) => baseUrl + `api/shoe-detail/${id}`,
  getCategory: () => baseUrl + "api/category?sizePage=100",
  getCategoryWithId: (id: number) => baseUrl + `api/category/${id}`,
  getAllShoe: (page: number, sizePage: number) =>
    baseUrl + `api/shoe?page=${page}&sizePage=${sizePage}`,
  getShoeWithCategory: (id: number, page: number, sizePage: number) =>
    baseUrl + `api/shoe?page=${page}&sizePage=${sizePage}&category=${id}`,
  // lấy giá theo chi tiết sản phẩm
  getPriceDetailShoe: (name: string, size: number, color: number) =>
    baseUrl +
    `api/shoe-detail?name=${name}&size=${size}&color=${color}&sizePage=100000`,
  // Lấy danh sách voucher
  getVoucher: () => baseUrl + `api/voucher?sizePage=100000`,
  getVoucherSearch: (name: string) =>
    baseUrl + `api/voucher?name=${name}&status=1`,
  getShoeSearch: (name: string, page: number) =>
    baseUrl + `api/shoe?name=${name}&page=${page}&sizePage=20`,

  // lọc sản phẩm
  getFilter: (
    colorID: string,
    sizeID: string,
    sole: string,
    brand: string,
    category: string,
    page: number
  ) =>
    baseUrl +
    `api/shoe?color=${colorID}&size=${sizeID}&sole=${sole}&brand=${brand}&category=${category}&page=${page}&sizePage=${20}`,
  getSearchBill: (code: string) =>
    baseUrl + `api/bill/find-by-code?code=${code}`,

  // lấy thông tin người dùng
  getInfoUser: (idUser: number) => baseUrl + `api/customer/${idUser}`,
  updateInfo: (idUser: number) => baseUrl + `api/customer/${idUser}`,

  // Lấy địa chỉ  người dùng
  getAddress: (idUser: number) =>
    baseUrl + `api/address/${idUser}?status=false&sizePage=100000`,
  addAdrress: () => baseUrl + `api/address`,
  deleteAdr: (id: number) => baseUrl + `api/address/${id}`,
  putAdr: (id: number | string) => baseUrl + `api/address/${id}`,
  // giỏ hangf
  addToCart: () => baseUrl + `api/cart`,
  getListDetailCart: (id: number) => baseUrl + `api/cart/${id}`,
  updateAmountShoe: () => baseUrl + `api/cart`,
  removeFromCart: (id: number) => baseUrl + `api/cart/${id}`,
};

export default API;
