import { User } from '@/@types';
import { getCookie } from '@/utils/cookies';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    loggInData: null,
    users: [] as User[],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    setLogginData: (state, action) => {
      state.loggInData = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((user) => user._id === action.payload._id);
      state.users[index] = action.payload;
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload._id);
    },
  },
});

export const { login, setLogginData, setUsers, addUser, updateUser, removeUser } =
  userSlice.actions;

export default userSlice.reducer;
