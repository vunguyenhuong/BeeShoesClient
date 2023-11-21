import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import path from "../../constants/path";
import "rc-slider/assets/index.css"; // Import CSS cho slider
import axios from "axios";
import API from "../../api";
import { IProduct, Product } from "../../types/product.type";
import ProductStanding from "../../components/ProductStanding";
import NavPage from "../../components/NavPage";
import SekeletonItemShoe from "../../components/SekeletonItemShoe";
import Fade from "react-reveal/Fade";
interface ShoeSize {
  id: number;
  size: string;
  selected: boolean;
}
interface ShoeMaterial {
  id: number;

  material: string;
  selected: boolean;
}
interface ShoseBrand {
  id: number;
  brand: string;
  selected: boolean;
}
interface ShoseColor {
  id: number;
  color: string;
  selected: boolean;
}
const ListProductsByBrand = () => {
  const location = useLocation();
  const params = useParams();
  const param = location.state;
  console.log("id", params);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState<boolean>(true);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState<boolean>(true);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState<boolean>(true);
  const [isDropdownOpen5, setIsDropdownOpen5] = useState<boolean>(true);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [priceRange2, setPriceRange2] = useState([
    {
      id: 1,
      priceRange: "0₫ - 1.000.000₫",
    },
    {
      id: 2,
      priceRange: "1.000.000₫ - 3.000.000₫",
    },
    {
      id: 3,
      priceRange: "3.000.000₫ - 5.000.000₫",
    },
    {
      id: 4,
      priceRange: "5.000.000₫ - 7.000.000₫",
    },
    {
      id: 5,
      priceRange: "7.000.000₫ - 10.000.000₫",
    },
    {
      id: 6,
      priceRange: "10.000.000₫ - 40.000.000₫",
    },
  ]);
  const [selectedSizes, setSelectedSizes] = useState<ShoeSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<ShoseColor[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<ShoeMaterial[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<ShoseBrand[]>([]);
  const [shoeSizes, setShoesSize] = useState<Product[]>();
  const [colors, setColors] = useState<Product[]>();
  const [materials, setMaterials] = useState<Product[]>();
  const [brands, setBrands] = useState<Product[]>();
  const [listShoes, setListShoes] = useState<IProduct[]>();
  const [idCategories, setIDCategories] = useState<any>("");
  const [idBrands, setIdBrands] = useState<any>("");
  const [selectedOption, setSelectedOption] = useState(""); // Trạng thái để lưu giá trị được chọn
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value); // Cập nhật giá trị khi tùy chọn thay đổi
  };

  const handleSizeSelect = (size: Product) => {
    setSelectedSizes((prevSizes) => {
      const existingSize = prevSizes.find((s) => s.size === size.name);

      if (existingSize) {
        return prevSizes.filter((s) => s.size !== size.name);
      } else {
        return [...prevSizes, { id: size.id, size: size.name, selected: true }];
      }
    });
  };
  const handleMaterialsSelect = (material: Product) => {
    setSelectedMaterials((prevMaterial) => {
      const existingSize = prevMaterial.find(
        (s) => s.material === material.name
      );
      if (existingSize) {
        return prevMaterial.filter((s) => s.material !== material.name);
      } else {
        return [
          ...prevMaterial,
          { id: material.id, material: material.name, selected: true },
        ];
      }
    });
  };
  const handleColorsSelect = (color: Product) => {
    setSelectedColors((prevColor) => {
      const existingColor = prevColor.find((s) => s.color === color.name);
      if (existingColor) {
        return prevColor.filter((s) => s.color !== color.name);
      } else {
        return [
          ...prevColor,
          { id: color.id, color: color.name, selected: true },
        ];
      }
    });
  };
  const handleBrandsSelect = (brand: Product) => {
    setSelectedBrands((prevBrands) => {
      const existingSize = prevBrands.find((s) => s.brand === brand.name);
      if (existingSize) {
        return prevBrands.filter((s) => s.brand !== brand.name);
      } else {
        return [
          ...prevBrands,
          { id: brand.id, brand: brand.name, selected: true },
        ];
      }
    });
  };
  const handlePriceChange = (value: any) => {
    setPriceRange(value);
  };
  // ----------------------------------------------------------------

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownTogglePrice = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };
  const handleDropdownToggleMaterial = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };
  const handleDropdownToggleBrand = () => {
    setIsDropdownOpen4(!isDropdownOpen4);
  };
  const handleDropdownToggleColor = () => {
    setIsDropdownOpen5(!isDropdownOpen5);
  };
  // ----------------------------------------------------------------
  const getDataSize = async () => {
    const res = await axios({
      method: "get",
      url: API.getSizeAll(),
    });
    if (res.status) {
      setShoesSize(res?.data?.data);
    }
  };
  const getDataColor = async () => {
    const res = await axios({
      method: "get",
      url: API.getAllColors(),
    });
    if (res.status) {
      setColors(res?.data?.data);
    }
  };

  // call dữ liệu
  //  theo chất liệu
  const getDataSole = async () => {
    const res = await axios({
      method: "get",
      url: API.getSole(),
    });
    if (res.status) {
      setMaterials(res.data?.data);
    }
  };
  //  theo thương hiệu
  const getBrand = async () => {
    const res = await axios({
      method: "get",
      url: API.getBrandAllPage(1, 1000000),
    });
    if (res.status) {
      setBrands(res?.data?.data);
    }
  };

  const getFilter = async () => {
    const myColor = selectedColors.map((i) => i.id);
    const idColors = myColor.join(",");
    const mySize = selectedSizes.map((i) => i.id);
    const idSizes = mySize.join(",");
    const myBrand = selectedBrands.map((i) => i.id);
    const myMaterials = selectedMaterials.map((i) => i.id);
    const idMaterials = myMaterials.join(",");
    if (location.pathname.includes("/brand=") && params.check) {
      const match = params.check.match(/brand=(\d+)/);
      if (match && match[1]) {
        const categoryId = match[1];
        console.log("Category ID:", categoryId);
        setIdBrands(categoryId);
      }
    } else if (location.pathname.includes("/category=") && params.check) {
      const match = params.check.match(/category=(\d+)/);
      if (match && match[1]) {
        const categoryId = match[1];
        console.log("Category ID:", categoryId);
        console.log("cate", categoryId);
        setIDCategories(categoryId);
      }
    } else {
      setIdBrands(myBrand.join(","));
    }
    if (!!idBrands || !!idCategories) {
      try {
        const res = await axios({
          method: "get",
          url: API.getFilter(
            idColors,
            idSizes,
            idMaterials,
            idBrands,
            idCategories,
            page
          ),
        });
        if (res.status) {
          setTotalPage(res.data.totalPages);
          setListShoes(res.data.data);
        }
      } catch (error) {
        console.error("Lỗi: ", error);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataSize();
    getDataSole();
    getBrand();
    getDataColor();
  }, []);
  useEffect(() => {
    console.log("kookookkok");
    getFilter();
  }, [
    selectedColors,
    selectedSizes,
    selectedMaterials,
    param,
    page,
    idBrands,
    idCategories,
    location.pathname,
  ]);
  return (
    <div className="w-full h-full ">
      <div className="flex w-full relative">
        {/* Lọc */}
        <aside
          id="logo-sidebar"
          className="  w-64 h-auto transition-transform -translate-x-full sm:translate-x-0 mt-[78px] "
          aria-label="Sidebar"
        >
          <span className="text-xl font-semibold text-gray-700">Bộ lọc</span>
          <div className=" mx-2 my-5 h-fit border-[1px] border-solid border-[#EDEDED]">
            <div className="flex flex-col items-center justify-center  w-full ">
              <button
                onClick={handleDropdownToggleColor}
                className="flex relative btn4 self-start bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center justify-between items-center border border-white  uppercase  tracking-wider  overflow-hidden w-full"
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                <p className="font-medium text-xs">màu sắc</p>
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen5 && (
                <div className="  w-full  rounded-lg px-2 py-2">
                  <div
                    className="grid grid-cols-2 gap-2 "
                    aria-labelledby="dropdownDefault"
                  >
                    {!!colors?.length &&
                      colors.map((color, index) => {
                        const isSelected = selectedColors.some(
                          (s) => s.color === color.name && s.selected
                        );
                        return (
                          <div
                            key={color.id}
                            className={` cursor-pointer flex items-center justify-center rounded py-1 w-full hover:bg-gray-600 ${
                              isSelected
                                ? "bg-gray-600 text-white"
                                : "bg-[#EDEDED] "
                            }   `}
                            onClick={() => handleColorsSelect(color)}
                          >
                            <span
                              className={` text-sm font-medium line-clamp-1 px-1
                   ${isSelected ? " text-white" : " text-gray-900"}    `}
                            >
                              {color.name}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              <button
                onClick={handleDropdownToggle}
                className="flex relative btn4 self-start bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center justify-between items-center border border-white  uppercase  tracking-wider  overflow-hidden w-full"
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                <p className="font-medium text-xs">kích thước size</p>
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="  w-full  rounded-lg mt-1  px-2 py-2">
                  <div
                    className="grid grid-cols-2 gap-2 "
                    aria-labelledby="dropdownDefault"
                  >
                    {!!shoeSizes?.length &&
                      shoeSizes.map((size, index) => {
                        const isSelected = selectedSizes.some(
                          (s) => s.size === String(size.name) && s.selected
                        );
                        return (
                          <div
                            key={size.id}
                            className={` cursor-pointer flex items-center justify-center rounded py-1 w-full hover:bg-gray-600 ${
                              isSelected
                                ? "bg-gray-600 text-white"
                                : "bg-[#EDEDED] "
                            }   `}
                            onClick={() => handleSizeSelect(size)}
                          >
                            <span
                              className={` text-sm font-medium 
                   ${isSelected ? " text-white" : " text-gray-900"}    `}
                            >
                              {size.name}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              {/* Theo thương hiệu */}
              {/* <button
                onClick={handleDropdownToggleBrand}
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                className="relative btn4 self-start  bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center flex justify-between items-center border border-white  uppercase  tracking-wider leading-none overflow-hidden w-full "
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                <p className="font-medium text-xs">Thương hiệu</p>

                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button> */}
              {/* Dropdown menu */}
              {/* {isDropdownOpen4 && (
                <div className="  w-full  rounded-lg p-2 ">
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="dropdownDefault"
                  >
                    {!!brands &&
                      !!brands.length &&
                      brands.map((brand, index) => {
                        const isSelected = selectedBrands.some(
                          (s) => s.brand === brand.name && s.selected
                        );
                        return (
                          <li
                            key={brand.id}
                            className="flex items-center cursor-pointer"
                            onClick={() => handleBrandsSelect(brand)}
                          >
                            <input
                              // onChange={handleChangeBrand}
                              id={`brand-${brand.id}`}
                              type="checkbox"
                              checked={isSelected}
                              className="w-4 h-4 bg-white border-gray-300 rounded text-primary-600 checked:bg-gray-600  focus:ring-0 "
                            />
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                              {brand.name}
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )} */}
              {/* theo chất liệu */}
              <button
                onClick={handleDropdownToggleMaterial}
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                className="relative btn4 self-start  bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center flex justify-between items-center border border-white  uppercase  tracking-wider leading-none overflow-hidden w-full  "
                type="button"
              >
                <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                <p className="font-medium text-xs">Chất liệu</p>

                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen3 && (
                <div className="  w-full  rounded-lg p-2">
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="dropdownDefault"
                  >
                    {!!materials &&
                      !!materials.length &&
                      materials.map((material, index) => {
                        const isSelected = selectedMaterials.some(
                          (s) => s.material === material.name && s.selected
                        );
                        return (
                          <li
                            key={index}
                            className="flex items-center cursor-pointer"
                            onClick={() => handleMaterialsSelect(material)}
                          >
                            <input
                              // onChange={handleChangeSole}
                              id={`material-${material.id}`}
                              type="checkbox"
                              checked={isSelected}
                              className="w-4 h-4 bg-white border-gray-300 rounded text-primary-600 checked:bg-gray-600  focus:ring-0"
                            />
                            <span
                              // htmlFor={`material-${material.id}`}
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                            >
                              {material.name}
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}

              <div className=" w-full">
                <button
                  onClick={handleDropdownTogglePrice}
                  id="dropdownDefault"
                  data-dropdown-toggle="dropdown"
                  className="relative btn4 self-start  bg-[#EDEDED] text-black font-medium  text-sm  py-2 px-2 text-center flex justify-between items-center border border-white  uppercase  tracking-wider leading-none overflow-hidden w-full  "
                  type="button"
                >
                  <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gray-400" />
                  <p className="font-medium text-xs">khoảng giá</p>
                  <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen2 && (
                  <Fragment>
                    <div>
                      {priceRange2.map((item, index) => {
                        return (
                          <div
                            className="flex items-center mb-4 cursor-pointer p-2"
                            key={item.id}
                          >
                            <input
                              id={`default-radio-${item.id}`}
                              type="radio"
                              value={item.priceRange}
                              name="default-radio"
                              className="w-4 h-4 text-blue-600 bg-white border-gray-300 checked:bg-gray-600  focus:ring-0"
                            />
                            <span
                              // htmlFor={`default-radio-${item.id}`}
                              className="ml-2 text-sm font-medium text-gray-900 "
                            >
                              {item.priceRange}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2 p-2">
                      <div className="relative z-0  ">
                        <input
                          value={priceRange[0]}
                          onChange={handlePriceChange}
                          type="text"
                          id="floating_standard"
                          className="w-full block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="floating_standard"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Giá thấp nhất
                        </label>
                      </div>

                      <br />

                      <div className="relative z-0  ">
                        <input
                          value={priceRange[1]}
                          onChange={handlePriceChange}
                          type="text"
                          id="floating_standard"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder="  "
                        />
                        <label
                          htmlFor="floating_standard"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Giá cao nhất
                        </label>
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* danh sách sản phẩm */}
        <div className="w-full mb-10">
          <div className="mx-auto  flex flex-col  my-4 items-center ">
            {!!param.status ? (
              <span className=" text-3xl font-medium uppercase">
                {param?.item?.name}
              </span>
            ) : (
              <span className=" text-3xl font-medium uppercase">
                {param?.name}
              </span>
            )}
          </div>
          <div className="w-full  mx-auto ">
            <div className="w-full flex justify-between items-center ">
              <div className="px-2">
                <span
                  className="cursor-pointer font-medium text-sm text-[#909097] "
                  onClick={() => {
                    navigate(path.home);
                  }}
                >
                  Trang chủ
                </span>
                /
                {!!param.status ? (
                  <span className=" text-sm font-medium ">
                    {" "}
                    {param?.item?.name}
                  </span>
                ) : (
                  <span className=" text-sm font-medium ">{param?.name}</span>
                )}
              </div>
              {/* Lọc sản phẩm */}
              <div>
                <select
                  value={selectedOption}
                  onChange={handleChangeSelect}
                  id="underline_select"
                  className="block py-1 px-2 w-full text-sm text-gray-500 bg-transparent border-solid border-1 border-gray-200  "
                >
                  <option selected value="US">
                    Sản phẩm mới
                  </option>
                  <option value="CA">Giá tăng dần</option>
                  <option value="FR">Giá giảm dần</option>
                  <option value="DE">Bán chạy</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mx-auto mt-4 px-2">
              {/* <Fade top distance="10%" duration={1500}> */}
              {!!listShoes && !!listShoes.length ? (
                listShoes.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (
                          !!item.minPrice &&
                          !!item.maxPrice &&
                          item.images &&
                          !!item.quantity &&
                          item.images.length > 0
                        ) {
                          navigate(`/product/${item.id}`, {
                            state: item.id,
                          });
                        } else {
                          return;
                        }
                      }}
                    >
                      <ProductStanding product={item} key={index} />
                    </div>
                  );
                })
              ) : !!listShoes && listShoes.length === 0 ? (
                <div className="text-sm font-semibold">Không có sản phẩm</div>
              ) : (
                Array(10)
                  .fill({})
                  .map((item, index) => {
                    return (
                      <div key={index}>
                        <SekeletonItemShoe />
                      </div>
                    );
                  })
              )}
              {/* </Fade> */}
            </div>
            {totalPage <= 1 ? (
              ""
            ) : (
              <div className="my-10">
                <NavPage totalPages={totalPage} page={page} setPage={setPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductsByBrand;
