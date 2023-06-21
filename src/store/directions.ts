import { createSlice } from "@reduxjs/toolkit";
import { DirectionState } from "../types/redusersTypes";

const initialState: DirectionState = {
  directions: [
    {
      code: "BTC",
      name: "Bitcoin BTC ",
    },
    {
      code: "ETH",
      name: "Ethereum ETH ",
    },
    {
      code: "CASHUSD",
      name: "Наличные USD ",
    },
    {
      code: "CASHRUB",
      name: "Наличные RUB ",
    },
    {
      code: "ACRUB",
      name: "Альфа-банк RUB ",
    },
    {
      code: "SBERRUB",
      name: "Сбербанк RUB ",
    },
    {
      code: "TCSBRUB",
      name: "Тинькофф RUB ",
    },
    {
      code: "USDTTRC",
      name: "Tether TRC20 USDT ",
    },
  ],
};

export const directionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});
export default directionSlice.reducer;
