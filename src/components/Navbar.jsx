import React from "react";
import Image from "next/image";
import ConnectWallet from "./ConnectWallet";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="flex flex-row justify-between items-center h-16 bg-white shadow-md m-6 p-4 rounded-xl">
      <Link href="/" className="flex flex-row justify-center items-center gap-4">
        <Image src="/logo.svg" width={20} height={20} alt="logo" />
        <p className="font-extrabold text-xl text-blue-400">EDUFLOW</p>
      </Link>
      <ConnectWallet />
    </div>
  );
};

export default Navbar;
