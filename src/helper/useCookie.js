import { jwtDecode } from "jwt-decode";
import { getCookie, setCookie } from "./CookiesRequest";

export const getTokenEmpoloyee = () => {
  return getCookie("userToken") || "";
};

export const getTokenCustomer = () => {
  return getCookie("customerToken") || "";
};

export const setToken = (token) => {
  const decodedToken = jwtDecode(token);
  const user = {
    id: decodedToken.id,
    email: decodedToken.email,
    role: decodedToken.role,
    fullName: decodedToken.fullName,
    avata: decodedToken.avata,
    expirationTime: new Date(decodedToken.exp * 1000),
  };
  const cookieName = "customerToken";
  setCookie(cookieName, token, 1);
};

export const deleteToken = () => {
  setCookie("customerToken1", "", 1);
  setCookie("customerToken", "", 1);
};

export const setUserToken = (token) => {
  const decodedToken = jwtDecode(token);
  const user = {
    id: decodedToken.id,
    email: decodedToken.email,
    role: decodedToken.role,
    fullName: decodedToken.fullName,
    avata: decodedToken.avata,
    expirationTime: new Date(decodedToken.exp * 1000),
  };
  const cookieName =
    user.role === "ROLE_USER" ? "customerToken1" : "userToken1";
  setCookie(cookieName, token, 1);
};

export const getUserToken = () => {
  return getCookie("userToken1") || getCookie("customerToken1") || "";
};

export const deleteUserToken = () => {
  setCookie("userToken", "", 1);
  setCookie("userToken1", "", 1);
};

export const getUserFromCookie = () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const token = getCookie("customerToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    const user = {
      id: decodedToken?.id,
      email: decodedToken?.email,
      role: decodedToken?.role,
      fullName: decodedToken.fullName,
      avata: decodedToken.avata,
      expirationTime: new Date(decodedToken.exp * 1000),
    };
    return user;
  } else {
    return null;
  }
};
