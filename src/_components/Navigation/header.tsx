'use client';
import Image from "next/image";
import Link from "next/link";
import logo from "@/_assets/logo.svg";
const header = () => {
  return (
    <div className="p-2 w-full text-white bg-[#2979ff] font-semibold">
    <nav className="w-full mx-auto max-w-[900px] gap-3 rounded-md py-2 px-4 flex items-center justify-between">
      <Link href="/" className="rounded-full relative text-white p-1 h-8 aspect-square bg-black/70">
        <div className="relative h-full w-full">
          <Image fill={true} alt="logo" src={logo} />
        </div>
      </Link>
      <h1>Weather Foss</h1>
    </nav>
  </div>
  );
};

export default header;
