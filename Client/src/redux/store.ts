import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user.slice';
import { IncommingReq, ReceivableNotes, StockRequest, User } from '@/@types';
import stockSlice from './slices/stock.slice';
import utilsSlice from './slices/utils.slice';
import { IStockMovement, OutgoingRequest } from '@/@types/types2';

const store = configureStore({
  reducer: {
    user: userSlice,
    stock: stockSlice,
    utils: utilsSlice,
  },
});

export type RootState = {
  user: {
    user: User | null;
    token: string | null;
    loggInData: any;
    users: User[];
  };
  stock: {
    incomming: IncommingReq[];
    requested: StockRequest[];
    receivedNotes: ReceivableNotes[];
    outgoing: OutgoingRequest[];
    movement: IStockMovement[];
  };
};

export default store;
