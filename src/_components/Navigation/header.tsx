'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/_assets/logo.svg";
import {LuSearch} from 'react-icons/lu'
const header = () => {
  return (
    <div className="p-2 w-full">
    <nav className="w-full mx-auto max-w-[900px] gap-3 shadow-md bg-black/40 rounded-md py-2 px-4 flex items-center justify-between">
      <Link href="/" className="rounded-full relative text-white p-1 h-8 aspect-square bg-black/70">
        <div className="relative h-full w-full">
          <Image fill={true} alt="logo" src={logo} />
        </div>
      </Link>
      <input type="text" className='grow bg-transparent text-md placeholder:text-gray-400 capitalize text-white caret-white outline-none ring-0' placeholder='eg. Lucknow' />
      <button className="rounded-full pl-2 relative text-gray-300 p-1 h-8 aspect-square bg-black/70">
        <LuSearch/>
      </button>
    </nav>
  </div>
  );
};

export default header;
