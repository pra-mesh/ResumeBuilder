import { URLS } from "@/constants";
import { UserInfo } from "@/types/UserInfoProps";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserState {
  users: UserInfo[];
  total: number;
  currentPage: number;
  limit: number;
  searchValue: string;
  error: string;
  isLoading: boolean;
  userReport: any[];
  selectedUser: UserInfo | null;
}

export const initialState: UserState = {
  users: [],
  total: 0,
  currentPage: 1,
  limit: 10,
  searchValue: "",
  error: "",
  isLoading: false,
  userReport: [],
  selectedUser: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    { limit, page, name }: { limit: number; page: number; name?: string },
    { rejectWithValue }
  ) => {
    try {
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
      const { data } = await axiosAdmin.get(`${URLS.USERS}/userReport`);
      return data;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data?.err ?? "Something went wrong",
      });
    }
  }
);
export const blockUser = createAsyncThunk(
  "users/blocked",
  async (
    { id, isBlocked }: { id: string; isBlocked: string },
    { rejectWithValue }
  ) => {
    try {
      await axiosAdmin.patch(`${URLS.USERS}/${id}/block`);
      return { id, isBlocked };
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
      state.limit = action.payload;
    },
    setSearch: (state, action) => {
      state.currentPage = 1; //BUG on search text change goes to first page before data change delay
      state.searchValue = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
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
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const existing = state.users.find(
          (user: UserInfo) => user?._id === action.payload.id
        );

        if (existing) {
          existing.isBlocked =
            action.payload.isBlocked === "blocked" ? true : false;
        }
      })

      .addCase(blockUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.data;
      })
      .addCase(blockUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      });
  },
});

export const { setCurrentPage, setLimit, setSearch, setSelectedUser } =
  userSlice.actions;
export const userReducer = userSlice.reducer; //for extraReducers
