import { NOT_FOUND } from "@/mapping_errors";

export const getItemLocalStorage = name => {
  const response = window.localStorage.getItem(name);
  if (response === null) {
    throw NOT_FOUND;
  }
  return JSON.parse(response);
};

export const setItemLocalStorage = (name, value) => {
  window.localStorage.setItem(name, JSON.stringify(value));
};

export const removeItemLocalStorage = (name) => {
  window.localStorage.removeItem(name);
};
