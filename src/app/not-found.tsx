import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="font-display text-[8rem] font-black leading-none text-violet [text-shadow:6px_6px_0_#0B0B0F]">404</p>
      <p className="mt-4 font-display text-2xl font-black">Nothing to settle here.</p>
      <Link href="/" className="btn-lime mt-8">Back home</Link>
    </div>
  );
}
