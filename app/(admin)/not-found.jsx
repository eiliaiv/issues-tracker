'use client'
import Link from 'next/link';
import { Button } from '@radix-ui/themes';
import Image from 'next/image';
import notFoundImg from "@/public/imge.png"
import { ReloadIcon } from '@radix-ui/react-icons';

export default function NotFound({ message }) {

  return (
    <div className='flex flex-row justify-center items-center h-dvh gap-8 md:flex-row p-x30'>
      <Image src={notFoundImg} alt="plug imge for 404" width={300} height={300} />
      <div className='flex flex-col justify-center items-center space-y-3'>
        <span className='text-9xl mb-5 font-medium'>404</span>
        <h1 className='text-2xl font-light'>Issue Not Found</h1>
        <p className='font-extralight text-center text-sm mb-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <div className='flex gap-4'>
          <Link href="/home">
            <Button>Back to issues page</Button>
          </Link>
          <Button onClick={() => window.location.reload()} ><ReloadIcon />reload</Button>
        </div>
      </div>
    </div>
  );
}