'use client'
import Link from 'next/link'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classname from 'classnames';
import { Box } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: "dashboard", href: "/" },
    { label: "issues", href: "/issues" },
  ]
  return (
    <nav className="flex space-x-6 border-b mb-5 h-14 px-5 items-center">
      <Link href="/"><FaBug className="hover:scale-120 transition-transform" /></Link>
      <ul className='flex space-x-6'>
        {links.map((link) => (
          <li key={link.href}>
            <Link className={classname({
              "text-zinc-900": pathname === link.href,
              "text-zinc-500": pathname !== link.href,
              "hover:text-zinc-800 transition-colors": true
            })} href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
          {status === "authenticated" && <Link href="/api/auth/signout">Log out</Link>}
          {status === "unauthenticated" && <Link href="/api/auth/signin">Log in</Link>}
      </Box>
    </nav >
  );
}

export default NavBar
