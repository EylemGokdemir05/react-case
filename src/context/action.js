import * as types from "./actionTypes";
import axios from "axios";

const getItems = (items) => ({
  type: types.GET_ITEMS,
  payload: items,
});

const getBrands = (brands) => ({
  type: types.GET_BRANDS,
  payload: brands,
});

export function addedItems(payload) {
  return {
    type: types.ADD_TO_CARD,
    payload,
  };
}

export function increaseQuantity(payload){
  return{
      type:'INCREASE_QUANTITY',
      payload
  }
}
export function decreaseQuantity(payload){
  return{
      type:'DECREASE_QUANTITY',
      payload
  }
}

export const loadItems = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((response) => {
        dispatch(getItems(response.data));
      })
      .catch((error) => error);
  };
};

export const loadBrands = () => {
  return function (dispatch) {
    axios
    .get(`${process.env.REACT_BRANDS_API}`)
    .then((response) => {
      dispatch(getBrands(response.data));
    })
    .catch((error) => error);
  };
};
