'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import AdminShell from '@/admin/AdminShell';

export default function AdminLayout({ children }) {
  return (
    <Provider store={store}>
      <AdminShell>{children}</AdminShell>
    </Provider>
  );
}
