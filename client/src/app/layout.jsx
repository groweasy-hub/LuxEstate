import '@/styles/globals.css';
import '@/styles/animations.css';
import ClientShell from '@/components/common/ClientShell';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const metadata = {
  title: `${SITE_CONFIG.brandName} - ${SITE_CONFIG.brandTagline}`,
  description: `Find your dream home with ${SITE_CONFIG.brandName}, your trusted real estate partner.`,
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
