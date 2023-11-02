import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';
// import { dispatch } from '..';
import { UsersInfo } from '../interfaces/usersInterfaces';

const initialState = {
  userInfo: {
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    profilePic: '',
    role: 'wizeliner',
  },
  usersInfo: [] as UsersInfo[],
  isLoading: true,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/users/`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch users');
    }

    const users = response.data.map((user:any) => ({
      fullName: `${user.firstName} ${user.lastName}`,
      areas: user?.areas ?? [''],
      isAdmin: user?.isAdmin ?? true,
      monthlyWizecoins: user?.monthlyWizecoins ?? 0,
    }));
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getProfile(state, action) {
      state.userInfo = action.payload;
    },
    setRole(state, action) {
      state.userInfo.role = action.payload;
    },
    setUsers(state, action) {
      state.usersInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersInfo = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export default slice.reducer;

export function setUserInfo(userInfo:object) {
  return slice.actions.getProfile(userInfo);
}

// export function getUsers() {
//   return async () => {
//     try {
//       const res = await axios.get(`${process.env.API_URL}/users/`);
//       const users = res.data.map((user:any) => {
//         const userInfo: UsersInfo = {
//           fullName: `${user.firstName} ${user.lastName}`,
//           areas: user?.areas ?? [''],
//           isAdmin: user?.isAdmin ?? true,
//           monthlyWizecoins: user?.monthlyWizecoins ?? 0,
//         };
//         return userInfo;
//       });
//       dispatch(slice.actions.setUsers(users));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
