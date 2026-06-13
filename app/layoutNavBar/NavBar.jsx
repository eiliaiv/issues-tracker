'use client'
import Link from 'next/link'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classname from 'classnames';
import { Avatar, Box, Text, DropdownMenu } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { useState } from "react"
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const router = useRouter();
  const links = [
    { label: "dashboard", href: "/" },
    { label: "issues", href: "/issues" },
  ]

  return (
    <nav className=" border-b mb-5 py-3 px-10">
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-5'>
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
        </div>
        <div>
          {session ?
            (<DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button>
                  <Avatar src={session?.user?.image || undefined} fallback={session?.user?.name?.[0]?.toUpperCase() || "G"} variant='solid' radius='full'></Avatar>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label><Text className='text-black' size="4">{session?.user?.email}</Text></DropdownMenu.Label>
                <DropdownMenu.Item><Box className="text-white bg-blue-700 w-full text-center rounded h-10 font-semibold text-lg pt-1.25">{status === "authenticated" && <Link href="/api/auth/signout">Log out</Link>}
                  {status === "unauthenticated" && <Link href="/api/auth/signin">Log in</Link>}</Box></DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>)
            :
            <div>
               <button onClick={()=>router.push("/signin")}>
                <Avatar variant='solid' radius='full' fallback="G"></Avatar>
               </button>
            </div>}
        </div>
      </div>
    </nav >
  );
}

export default NavBar
