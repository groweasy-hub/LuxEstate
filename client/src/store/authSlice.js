import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI, clearAuthToken, getAuthToken, setAuthToken } from '@/lib/api';

export const loginAdmin = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try { const { data } = await authAPI.login(credentials); return data; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Login failed'); }
});

export const logoutAdmin = createAsyncThunk('auth/logout', async () => {
  await authAPI.logout();
});

export const fetchMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try { const { data } = await authAPI.me(); return data.admin; }
  catch { return rejectWithValue(null); }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { admin: null, token: getAuthToken(), loading: false, error: null, checked: false },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(loginAdmin.pending,  (s) => { s.loading = true; s.error = null; })
      .addCase(loginAdmin.fulfilled,(s, { payload }) => {
        s.loading = false;
        s.admin = payload.admin;
        s.token = payload.token;
        setAuthToken(payload.token);
      })
      .addCase(loginAdmin.rejected, (s, { payload }) => { s.loading = false; s.error = payload; })

      .addCase(logoutAdmin.fulfilled, (s) => {
        s.admin = null;
        s.token = null;
        clearAuthToken();
      })

      .addCase(fetchMe.fulfilled, (s, { payload }) => { s.admin = payload; s.checked = true; })
      .addCase(fetchMe.rejected,  (s) => { s.checked = true; });
  },
});

export default authSlice.reducer;
