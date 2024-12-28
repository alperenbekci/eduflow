import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex justify-center text-2xl font-bold text-blue-500 mt-16">
      <Link href="/messages">go to messages </Link>
    </div>
  );
};

export default Home;
