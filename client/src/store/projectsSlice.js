import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectsAPI } from '@/lib/api';

export const fetchProjects = createAsyncThunk('projects/fetchAll', async (params, { rejectWithValue }) => {
  try { const { data } = await projectsAPI.getAll(params); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to fetch projects'); }
});

export const fetchFeatured = createAsyncThunk('projects/fetchFeatured', async (_, { rejectWithValue }) => {
  try { const { data } = await projectsAPI.getFeatured(); return data.items; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

export const createProject = createAsyncThunk('projects/create', async (payload, { rejectWithValue }) => {
  try { const { data } = await projectsAPI.create(payload); return data.project; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

export const updateProject = createAsyncThunk('projects/update', async ({ id, data: payload }, { rejectWithValue }) => {
  try { const { data } = await projectsAPI.update(id, payload); return data.project; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

export const deleteProject = createAsyncThunk('projects/delete', async (id, { rejectWithValue }) => {
  try { await projectsAPI.remove(id); return id; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: { items: [], featured: [], total: 0, loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchProjects.pending,  (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProjects.fulfilled,(s, { payload }) => { s.loading = false; s.items = payload.items; s.total = payload.total; })
      .addCase(fetchProjects.rejected, (s, { payload }) => { s.loading = false; s.error = payload; })

      .addCase(fetchFeatured.fulfilled,(s, { payload }) => { s.featured = payload; })

      .addCase(createProject.fulfilled,(s, { payload }) => { s.items.unshift(payload); s.total += 1; })
      .addCase(updateProject.fulfilled,(s, { payload }) => {
        const i = s.items.findIndex((p) => p._id === payload._id);
        if (i !== -1) s.items[i] = payload;
      })
      .addCase(deleteProject.fulfilled,(s, { payload }) => {
        s.items = s.items.filter((p) => p._id !== payload);
        s.total -= 1;
      });
  },
});

export default projectsSlice.reducer;
