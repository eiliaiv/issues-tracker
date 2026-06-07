import Link from 'next/link';
import { Button } from '@radix-ui/themes';


export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-150 space-y-2'>
      <span className='text-9xl mb-5'>404</span>
      <h1 className='text-2xl font-light'>Issue Not Found</h1>

      <Link href="/issues">
        <Button>Back to issues page</Button>
      </Link>
    </div>
  );
}