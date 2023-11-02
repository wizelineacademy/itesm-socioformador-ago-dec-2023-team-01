import { createSlice } from '@reduxjs/toolkit';
import axios from '@/utils/axios';
import { dispatch } from '..';

const initialState = {
  userInfo: {
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    profilePic: '',
    role: 'wizeliner',
  },
};

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
  },
});

export default slice.reducer;

// export function getProfile() {
//   return async () => {
//     try {
//       const response = await axios.get(`${process.env.API_URL}`)
//     } catch (error) {
//     }
//   }
// }

export function setUserInfo(userInfo:object) {
  dispatch(slice.actions.getProfile(userInfo));
}
