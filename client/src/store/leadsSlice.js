import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { leadsAPI } from '@/lib/api';

export const fetchLeads = createAsyncThunk('leads/fetchAll', async (params, { rejectWithValue }) => {
  try { const { data } = await leadsAPI.getAll(params); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

export const fetchLeadStats = createAsyncThunk('leads/stats', async (_, { rejectWithValue }) => {
  try { const { data } = await leadsAPI.getStats(); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

export const submitLead = createAsyncThunk('leads/submit', async (payload, { rejectWithValue }) => {
  try { const { data } = await leadsAPI.submit(payload); return data.lead; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

export const updateLeadStatus = createAsyncThunk('leads/updateStatus', async ({ id, status, notes }, { rejectWithValue }) => {
  try { const { data } = await leadsAPI.updateStatus(id, { status, notes }); return data.lead; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

export const deleteLead = createAsyncThunk('leads/delete', async (id, { rejectWithValue }) => {
  try { await leadsAPI.remove(id); return id; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

const leadsSlice = createSlice({
  name: 'leads',
  initialState: { items: [], total: 0, stats: null, loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchLeads.pending,  (s) => { s.loading = true; s.error = null; })
      .addCase(fetchLeads.fulfilled,(s, { payload }) => { s.loading = false; s.items = payload.items; s.total = payload.total; })
      .addCase(fetchLeads.rejected, (s, { payload }) => { s.loading = false; s.error = payload; })

      .addCase(fetchLeadStats.fulfilled, (s, { payload }) => { s.stats = payload; })

      .addCase(submitLead.fulfilled, (s, { payload }) => { s.items.unshift(payload); s.total += 1; })

      .addCase(updateLeadStatus.fulfilled, (s, { payload }) => {
        const i = s.items.findIndex((l) => l._id === payload._id);
        if (i !== -1) s.items[i] = payload;
      })
      .addCase(deleteLead.fulfilled, (s, { payload }) => {
        s.items = s.items.filter((l) => l._id !== payload);
        s.total -= 1;
      });
  },
});

export default leadsSlice.reducer;
