import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { offersAPI } from '@/lib/api';

export const fetchOffers = createAsyncThunk('offers/fetchAll', async (params, { rejectWithValue }) => {
  try { const { data } = await offersAPI.getAll(params); return data.items; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

export const fetchFeaturedOffer = createAsyncThunk('offers/featured', async (_, { rejectWithValue }) => {
  try { const { data } = await offersAPI.getFeatured(); return data.offer; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

export const createOffer = createAsyncThunk('offers/create', async (payload, { rejectWithValue }) => {
  try { const { data } = await offersAPI.create(payload); return data.offer; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

export const updateOffer = createAsyncThunk('offers/update', async ({ id, data: payload }, { rejectWithValue }) => {
  try { const { data } = await offersAPI.update(id, payload); return data.offer; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

export const deleteOffer = createAsyncThunk('offers/delete', async (id, { rejectWithValue }) => {
  try { await offersAPI.remove(id); return id; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

const offersSlice = createSlice({
  name: 'offers',
  initialState: { items: [], featured: null, loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchOffers.pending,  (s) => { s.loading = true; })
      .addCase(fetchOffers.fulfilled,(s, { payload }) => { s.loading = false; s.items = payload; })
      .addCase(fetchOffers.rejected, (s, { payload }) => { s.loading = false; s.error = payload; })

      .addCase(fetchFeaturedOffer.fulfilled, (s, { payload }) => { s.featured = payload; })

      .addCase(createOffer.fulfilled, (s, { payload }) => { s.items.unshift(payload); })
      .addCase(updateOffer.fulfilled, (s, { payload }) => {
        const i = s.items.findIndex((o) => o._id === payload._id);
        if (i !== -1) s.items[i] = payload;
      })
      .addCase(deleteOffer.fulfilled, (s, { payload }) => {
        s.items = s.items.filter((o) => o._id !== payload);
      });
  },
});

export default offersSlice.reducer;
