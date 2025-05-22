import { URLS } from "@/constants";

import { axiosAdmin } from "@/lib/axiosAdmin";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  total: 0,
  currentPage: 1,
  limit: 10,
  searchValue: "",
  error: "",
  isLoading: false,
  userReport: [],
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    { limit, page, name }: { limit: number; page: number; name?: string },
    { rejectWithValue }
  ) => {
    try {
      //TODO Convert to tanstack query
      const res = await axiosAdmin.get(
        `${URLS.USERS}?limit=${limit}&page=${page}&name=${encodeURIComponent(
          name ?? ""
        )}`
      );
      return res.data;
    } catch (e: any) {
      
      return rejectWithValue({
        data: e?.response?.data?.err ?? "Something went wrong",
      });
    }
  }
);
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      //TODO  set to and from date

      const { data } = await axiosAdmin.get(`${URLS.USERS}/userReport`);

      return data;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data?.err ?? "Something went wrong",
      });
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.currentPage = 1;
      state.limit = action.payload;
    },
    setSearch: (state, action) => {
      state.currentPage = 1;
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.data;
        state.total = 0;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userReport = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.data;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      });
  },
});

export const { setCurrentPage, setLimit, setSearch } = userSlice.actions;
export const userReducer = userSlice.reducer; //for extraReducers
