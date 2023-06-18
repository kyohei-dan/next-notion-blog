'use client'
import Link from 'next/link';
import { usePathname } from "next/navigation";

const navItems: { label: string; path: string; }[] = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav>
        <h1>
          <Link href="/">PORTFOLIO</Link>
        </h1>

        <ul>
          {navItems.map(({ label, path }) => (
            <li key={label}>
              <Link href={path} className={pathname === path ? "is-current-page" : null}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}


