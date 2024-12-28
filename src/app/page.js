import React from "react";
import Link from "next/link";
import ConnectWallet from "@/components/ConnectWallet";

const Home = () => {
  return (
    <div className="flex justify-center text-2xl font-bold text-blue-500">
      <Link href="/">Welcome your eduflow!</Link>
    </div>
  );
};

export default Home;
