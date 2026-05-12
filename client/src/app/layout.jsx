import '@/styles/globals.css';
import '@/styles/animations.css';
import ClientShell from '@/components/common/ClientShell';

export const metadata = {
  title: 'LuxEstate — Premium Real Estate',
  description: 'Find your dream luxury home with LuxEstate, your trusted channel partner.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
