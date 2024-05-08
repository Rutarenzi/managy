import { StockRequest } from '@/@types';
import { IncommingReq } from '@/@types';
import { ReceivableNotes } from '@/@types';
import { IStockMovement, OutgoingRequest } from '@/@types/types2';
import { createSlice } from '@reduxjs/toolkit';

export const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    incomming: [] as IncommingReq[],
    requested: [] as StockRequest[],
    receivedNotes: [] as ReceivableNotes[],
    outgoing: [] as OutgoingRequest[],
    movement: [] as IStockMovement[],
  },
  reducers: {
    setIncommingStock: (state, action) => {
      state.incomming = action.payload;
    },
    setStockRequests: (state, action) => {
      state.requested = action.payload;
    },
    setReceivedNotes: (state, action) => {
      state.receivedNotes = action.payload;
    },
    addRequestedStock: (state, action) => {
      state.requested = [...state.requested, action.payload];
    },
    addReceivedNotes: (state, action) => {
      state.receivedNotes = [...state.receivedNotes, action.payload];
    },
    addIncomingStock: (state, action) => {
      state.incomming = [...state.incomming, action.payload];
    },
    removeRequestedStock: (state, action) => {
      state.requested = state.requested.filter((item) => item._id !== action.payload);
    },
    removeReceivedNotes: (state, action) => {
      state.receivedNotes = state.receivedNotes.filter((item) => item._id !== action.payload);
    },
    removeIncomingStock: (state, action) => {
      state.incomming = state.incomming.filter((item) => item._id !== action.payload);
    },
    updateRequestedStock: (state, action) => {
      const index = state.requested.findIndex((item) => item._id === action.payload._id);
      state.requested[index] = action.payload;
    },
    updateReceivedNotes: (state, action) => {
      const index = state.receivedNotes.findIndex((item) => item._id === action.payload._id);
      state.receivedNotes[index] = action.payload;
    },
    updateIncomingStock: (state, action) => {
      const index = state.incomming.findIndex((item) => item._id === action.payload._id);
      state.incomming[index] = action.payload;
    },
    setOutgoingRequests: (state, action) => {
      state.outgoing = action.payload;
    },
    setStockMovements: (state, action) => {
      state.movement = action.payload;
    },
    addOutgoingRequest: (state, action) => {
      state.outgoing = [...state.outgoing, action.payload];
    },
    addStockMovement: (state, action) => {
      state.movement = [...state.movement, action.payload];
    },
    removeOutgoingRequest: (state, action) => {
      state.outgoing = state.outgoing.filter((item) => item._id !== action.payload);
    },
    removeStockMovement: (state, action) => {
      state.movement = state.movement.filter((item) => item._id !== action.payload);
    },
    updateOutgoingRequest: (state, action) => {
      const index = state.outgoing.findIndex((item) => item._id === action.payload._id);
      state.outgoing[index] = action.payload;
    },
    updateStockMovement: (state, action) => {
      const index = state.movement.findIndex((item) => item._id === action.payload._id);
      state.movement[index] = action.payload;
    },
  },
});

export const {
  setIncommingStock,
  setReceivedNotes,
  setStockRequests,
  addIncomingStock,
  addReceivedNotes,
  addRequestedStock,
  updateIncomingStock,
  updateReceivedNotes,
  updateRequestedStock,
  removeIncomingStock,
  removeReceivedNotes,
  removeRequestedStock,
  setOutgoingRequests,
  setStockMovements,
  addOutgoingRequest,
  addStockMovement,
  removeOutgoingRequest,
  removeStockMovement,
  updateOutgoingRequest,
  updateStockMovement,
} = stockSlice.actions;
export default stockSlice.reducer;
