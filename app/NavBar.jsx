'use client'
import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classname from 'classnames';

const NavBar = () => {
  const pathname = usePathname();
  const links = [
    { label: "dashboard", href: "/" },
    { label: "issues", href: "/issues" },
  ]
  return (
    <nav className="flex space-x-6 border-b mb-5 h-14 px-5 items-center">
      <Link href="/"><FaBug /></Link>
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
    </nav >
  );
}

export default NavBar
