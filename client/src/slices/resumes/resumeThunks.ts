import { URLS } from "@/constants";
import { axiosAdmin } from "@/lib/axiosAdmin";
import {
  saveResume,
  updateResumeServer,
  deleteResume,
  getResumeByID,
} from "@/services/resume";
import { Resume, ResumeState } from "@/types/resume";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveResumeToServer = createAsyncThunk(
  "resume/saveResumeToServer",
  async (payload: Resume, { dispatch, getState, rejectWithValue }) => {
    try {
      const res = await saveResume(payload);
      /// return { ...res.data.data, id: payload.id }; //spreading and replacing data
      const result = res.data.data;
      result.id = payload.id;
      const state = getState() as { resumes: ResumeState };
      const { currentPage, totalPages, limit } = state.resumes;
      if (totalPages === currentPage)
        dispatch(loadResumes({ limit, page: currentPage }));
      return result;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data?.err ?? "Something went wrong",
      });
    }
  }
);
export const updateResumeOnServer = createAsyncThunk(
  "resume/updateResumeToServer",
  async (payload: Resume, { rejectWithValue }) => {
    try {
      await updateResumeServer(payload);
      return payload;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data?.err ?? "Something went wrong",
      });
    }
  }
);

export const loadResumes = createAsyncThunk(
  "resume/LoadResume",
  async (
    {
      limit,
      page,
      searchValue,
    }: { limit: number; page: number; searchValue?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosAdmin.get(
        `${URLS.RESUMES}?limit=${limit}&page=${page}&title=${encodeURIComponent(
          searchValue ?? ""
        )}`
      );
      return res.data;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data?.err?.message ?? "Something went wrong",
      });
    }
  }
);
export const deleteResumeThunk = createAsyncThunk(
  "resume/DeleteResume",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteResume(id);
      return id;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response.data?.err?.message ?? "Something went wrong",
      });
    }
  }
);
export const getResumeByIDThunk = createAsyncThunk(
  "resume/Get",
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await getResumeByID(id);
      return result.data.data;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response.data?.err?.message ?? "Something went wrong",
      });
    }
  }
);
