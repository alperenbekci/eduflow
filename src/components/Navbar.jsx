import React from "react";
import Button from "./Button";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="flex flex-row justify-between items-center h-16 bg-white shadow-md m-6 p-4 rounded-xl">
      <div className="flex flex-row justify-center items-center gap-4">
        <Image src="/logo.svg" width={40} height={40} alt="logo" />

        <p className="font-extrabold text-3xl text-blue-400 ">EDUFLOW</p>
      </div>

      <Button>Connect Wallet</Button>
    </div>
  );
};

export default Navbar;
