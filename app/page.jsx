import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>hello</div>
      <Link href="/api/auth/signin">sign in</Link>
    </>

  );
}
