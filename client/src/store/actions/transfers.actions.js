import axios from "axios";

import { transfersActions } from "../slices/transfers.slice";

const API_URL = "http://localhost:4000/api/v1/transfers";

export const getUsersTransfers = (userId) => {
  return async (dispatch) => {
    try {
      // API REQUEST
      const res = axios.get(API_URL + "/" + userId);
      dispatch(transfersActions.getTransfers());
    } catch (error) {
      console.log(error);
    }
  };
};

export const newTransfer = (accountNumber, amount) => {
  return async (dispatch) => {
    try {
      // API REQUEST
      dispatch(transfersActions.newTransfer());
    } catch (error) {
      console.log(error);
    }
  };
};
