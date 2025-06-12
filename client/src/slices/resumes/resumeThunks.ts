import { URLS } from "@/constants";
import { axiosAdmin } from "@/lib/axiosAdmin";
import {
  saveResume,
  updateResumeServer,
  deleteResume,
} from "@/services/resume";
import { Resume } from "@/types/resume";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveResumeToServer = createAsyncThunk(
  "resume/saveResumeToServer",
  async (payload: Resume, { rejectWithValue }) => {
    try {
      const res = await saveResume(payload);
      /// return { ...res.data.data, id: payload.id }; //spreading and replacing data
      const result = res.data.data;
      result.id = payload.id;
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
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosAdmin.get(`${URLS.RESUMES}?limit=10000&page=1`);

      return res.data.data;
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
