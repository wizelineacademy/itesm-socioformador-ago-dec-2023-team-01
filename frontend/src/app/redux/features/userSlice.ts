import { createSlice } from '@reduxjs/toolkit';

type Tokens = {
  totalAmountTokens: number;
  currentAmountTokens: number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  role: string;
  tokens: Tokens;
  jwtToken: string;
};

type UserState = {
  userInfo: User | null;
  isLoading: boolean;
};

const initialState: UserState = {
  userInfo: null,
  isLoading: false,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    addTokens: (state, action) => {
      if (state.userInfo) {
        state.userInfo.tokens.currentAmountTokens += action.payload;
      }
    },
    subtractTokens: (state, action) => {
      if (state.userInfo) {
        if (state.userInfo.tokens.currentAmountTokens - action.payload >= 0) {
          state.userInfo.tokens.currentAmountTokens -= action.payload;
        } else {
          state.userInfo.tokens.currentAmountTokens = 0;
        }
      }
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  setUserInfo, addTokens, subtractTokens, setIsLoading, resetUser,
} = user.actions;
export default user.reducer;
