import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/utils/axios';
import { GroupsInfo } from '../interfaces/groupsInterfaces';

const initialState = {
  groupsInfo: [] as GroupsInfo[],
  isLoading: true,
};

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async (accessToken) => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/group/getAllGroups`, { headers });
    if (response.status !== 200) {
      throw new Error('Failed to fetch users');
    }

    const groups = response.data.map((group:any) => ({
      title: group.name,
      members: 20,
      moneySpent: 20,
      data: {
        labels: ['Used'],
        datasets: [
          {
            label: 'Group Overview',
            data: [49, 51],
            backgroundColor: ['#E93D44', 'rgba(0,0,0,0)'],
            borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
            cutout: '37',
            borderRadius: 30,
          },
        ],
      },
    }));
    return groups;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const slice = createSlice({
  name: 'group',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groupsInfo = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export default slice.reducer;

// groupInfo: {
//   title: '',
//   members: 0,
//   moneySpent: 0,
//   data: {
//     labels: ['Used'],
//     datasets: [
//       {
//         label: 'Group Overview',
//         data: [100, 0],
//         backgroundColor: ['#E93D44', 'rgba(0,0,0,0)'],
//         borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
//         cutout: '37',
//         borderRadius: 30,
//       },
//     ],
//   },
// },
