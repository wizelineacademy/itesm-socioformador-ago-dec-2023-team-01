import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/utils/axios';
import { GroupsInfo } from '../interfaces/groupsInterfaces';

const initialState = {
  groupsInfo: [] as GroupsInfo[],
  isLoading: true,
};

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
  try {
    const tokenReponse = await axios.get('/api/token');
    const accessToken = tokenReponse.data.foo;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/group/getAllGroups`, { headers });
    if (response.status !== 200) {
      throw new Error('Failed to fetch users');
    }

    const groups = response.data.map((group:any) => ({
      title: group.group.name,
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

export const fetchGroup = createAsyncThunk('groups/fetchGroup', async (groupName:string) => {
  try {
    const tokenReponse = await axios.get('/api/token');
    const accessToken = tokenReponse.data.foo;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/group/findUsersInGroup/${groupName}`, { headers });
    console.log('Hello', response.data);
  } catch (error) {
    console.log('hello');
  }
});

export const createGroup = createAsyncThunk('groups/createGroup', async (groupName:string) => {
  try {
    const tokenReponse = await axios.get('/api/token');
    const accessToken = tokenReponse.data.foo;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      name: groupName,
      area: 'development',
    };
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/group`, data, { headers });
    console.log(response.status);
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
