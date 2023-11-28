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
  user: User | null;
  isLoading: boolean;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addTokens: (state, action) => {
      if (state.user) {
        state.user.tokens.currentAmountTokens += action.payload;
      }
    },
    subtractTokens: (state, action) => {
      if (state.user) {
        state.user.tokens.currentAmountTokens -= action.payload;
      }
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setUser, addTokens, subtractTokens, setIsLoading,
} = user.actions;
export default user.reducer;
