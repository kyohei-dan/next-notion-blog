import { NEXT_PUBLIC_SITE_TITLE, NEXT_PUBLIC_SITE_DESCRIPTION } from './server-constants'
import '/public/scss/styles.scss'

export const metadata = {
  title: NEXT_PUBLIC_SITE_TITLE,
  description: NEXT_PUBLIC_SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.svg",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {

  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
